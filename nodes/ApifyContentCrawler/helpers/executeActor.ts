import { IExecuteFunctions, INodeExecutionData, NodeApiError } from 'n8n-workflow';
import { apiRequest, getResults, pollRunStatus } from './genericFunctions';
import { ACTOR_ID } from '../ApifyContentCrawler.node';

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

export async function executeActorRunFlow(
	this: IExecuteFunctions,
	actorId: string,
	mergedInput: Record<string, any>,
): Promise<INodeExecutionData> {
	const run = await runActorApi.call(this, actorId, mergedInput, { waitForFinish: 0 });
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



export async function runActor(this: IExecuteFunctions, i: number): Promise<INodeExecutionData> {
	const entries = this.getNodeParameter('entries', i, {}) as {
		entry?: { value: string }[];
	};
	const crawlerType = this.getNodeParameter('crawlerType', i) as string;
	const sitemapUrlsEnabled = this.getNodeParameter('sitemapUrlsEnabled', i) as boolean;
	const maxDepth = this.getNodeParameter('maxDepth', i) as number;
	const maxPages = this.getNodeParameter('maxPages', i) as number;

	const build = await getDefaultBuild.call(this, ACTOR_ID);
	const defaultInput = getDefaultInputsFromBuild(build);

	const mergedInput: Record<string, any> = {
		...defaultInput,
		crawlerType,
		useSitemaps: sitemapUrlsEnabled,
		maxCrawlDepth: maxDepth,
		maxCrawlPages: maxPages,
	};

	delete mergedInput.startUrls;
	if (entries?.entry?.length) {
		mergedInput.startUrls = entries.entry.map((e) => ({
			url: e.value,
			method: 'GET',
		}));
	}

	return await executeActorRunFlow.call(this, ACTOR_ID, mergedInput);
}

