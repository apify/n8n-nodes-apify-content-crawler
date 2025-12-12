import { IExecuteFunctions, INodeExecutionData, NodeApiError } from 'n8n-workflow';
import { apiRequest, getResults, pollRunStatus } from '../../../helpers/genericFunctions';
import { ACTOR_ID } from '../../../ApifyContentCrawler.node';

export function getDefaultInputsFromBuild(build: any) {
	const buildInputProperties = build?.actorDefinition?.input?.properties;
	const defaultInput: Record<string, any> = {};
	if (buildInputProperties && typeof buildInputProperties === 'object') {
		for (const [key, property] of Object.entries(buildInputProperties)) {
			if (
				property &&
				typeof property === 'object' &&
				'prefill' in property &&
				(property as any).prefill !== undefined &&
				(property as any).prefill !== null
			) {
				defaultInput[key] = (property as any).prefill;
			}
		}
	}
	return defaultInput;
}

export async function getDefaultBuild(this: IExecuteFunctions, actorId: string) {
	const defaultBuildResp = await apiRequest.call(this, {
		method: 'GET',
		uri: `/v2/acts/${actorId}/builds/default`,
	});
	if (!defaultBuildResp?.data) {
		throw new NodeApiError(this.getNode(), {
			message: `Could not fetch default build for actor ${actorId}`,
		});
	}
	return defaultBuildResp.data;
}

export function buildActorInput(
	this: IExecuteFunctions,
	i: number,
	defaultInput: Record<string, any>,
): Record<string, any> {
	const startUrl = this.getNodeParameter('startUrl', i) as string;
	const crawlerType = this.getNodeParameter('crawlerType', i) as string;

	const mergedInput: Record<string, any> = {
		...defaultInput,
		crawlerType,
		maxCrawlDepth: 1,
		maxCrawlPages: 1,
	};

	delete mergedInput.startUrls;
	if (startUrl) {
		mergedInput.startUrls = [
			{
				url: startUrl,
				method: 'GET',
			},
		];
	}

	return mergedInput;
}

export async function runActorApi(
	this: IExecuteFunctions,
	actorId: string,
	mergedInput: Record<string, any>,
	qs: Record<string, any>,
) {
	return await apiRequest.call(this, {
		method: 'POST',
		uri: `/v2/acts/${actorId}/runs`,
		body: mergedInput,
		qs,
	});
}

export async function scrapeSingle(this: IExecuteFunctions, i: number): Promise<INodeExecutionData> {
	const build = await getDefaultBuild.call(this, ACTOR_ID);
	const defaultInput = getDefaultInputsFromBuild(build);

	const mergedInput = buildActorInput.call(this, i, defaultInput);

	const run = await runActorApi.call(this, ACTOR_ID, mergedInput, { waitForFinish: 0 });
	if (!run?.data?.id) {
		throw new NodeApiError(this.getNode(), {
			message: `Run ID not found after running the actor`,
		});
	}

	const runId = run.data.id;
	const datasetId = run.data.defaultDatasetId;

	// Wait for Actor run to finish
	await pollRunStatus.call(this, runId);

	return await getResults.call(this, datasetId);
}
