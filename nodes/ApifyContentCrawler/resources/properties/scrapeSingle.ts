import { IExecuteFunctions, INodeExecutionData, INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { executeActorRun } from '../../helpers/genericFunctions';
import { ACTOR_ID } from '../../ApifyContentCrawler.node';

export const name = 'Scrape URL';

export const option: INodePropertyOptions = {
	name: 'Scrape URL',
	value: 'Scrape URL',
	action: 'Scrape single URL',
	description: 'Scrape a single starting URL and extract content',
};

export const properties: INodeProperties[] = [
	{
		displayName: 'Start URL',
		name: 'startUrl',
		type: 'string',
		default: 'https://docs.apify.com/academy/web-scraping-for-beginners',
		description:
			'The URL of the page where the crawler will start. By default, the Actor will also crawl sub-pages of this URL.',
		placeholder: 'https://example.com',
		displayOptions: {
			show: {
				resource: ['Website Content Crawler'],
				operation: ['Scrape URL'],
			},
		},
	},
	{
		displayName: 'Crawler Type',
		name: 'crawlerType',
		type: 'options',
		default: 'playwright:adaptive',
		options: [
			{
				name: 'Adaptive Switching Between Browser and Raw HTTP - Fast and Renders JavaScript Content if Present. This Is the Recommended Option.',
				value: 'playwright:adaptive',
			},
			{
				name: 'Headless Browser (Firefox+Playwright) - Reliable, Renders JavaScript Content, Best in Avoiding Blocking, but Might Be Slow.',
				value: 'playwright:firefox',
			},
			{
				name: "Raw HTTP Client (Cheerio) - Fastest, but Doesn't Render JavaScript Content.",
				value: 'cheerio',
			},
		],
		description:
			'Adaptive switching between browser and raw HTTP (default) - Fast and renders JavaScript content if present. This is the recommended option.\nHeadless web browser with Firefox and Playwright - Useful for modern websites with anti-scraping protections and JavaScript rendering. It recognizes common blocking patterns like CAPTCHAs and automatically retries blocked requests through new sessions.\nRaw HTTP client - High-performance crawling mode that uses raw HTTP requests to fetch the pages. It is faster and cheaper, but it might not work on all websites.',
		displayOptions: {
			show: {
				resource: ['Website Content Crawler'],
				operation: ['Scrape URL'],
			},
		},
	},
];

export async function execute(this: IExecuteFunctions, i: number): Promise<INodeExecutionData> {
	const startUrl = this.getNodeParameter('startUrl', i) as string;
	const crawlerType = this.getNodeParameter('crawlerType', i) as string;

	const actorInput: Record<string, any> = {
		crawlerType,
		maxCrawlDepth: 1,
		maxCrawlPages: 1,
	};

	if (startUrl) {
		actorInput.startUrls = [
			{
				url: startUrl,
				method: 'GET',
			},
		];
	}

	return await executeActorRun.call(this, ACTOR_ID, actorInput);
}
