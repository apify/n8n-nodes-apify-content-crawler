import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ACTOR_ID } from '../../../ApifyContentCrawler.node';
import {
	getDefaultBuild,
	getDefaultInputsFromBuild,
	executeActorRunFlow,
} from '../../executeActor';

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
