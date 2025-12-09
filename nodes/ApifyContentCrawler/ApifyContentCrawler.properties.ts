import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';

const authenticationProperties: INodeProperties[] = [
	{
		displayName: 'Authentication',
		name: 'authentication',
		type: 'options',
		options: [
			{
				name: 'API Key',
				value: 'apifyApi',
			},
			{
				name: 'OAuth2',
				value: 'apifyOAuth2Api',
			},
		],
		default: 'apifyApi',
		description: 'Choose which authentication method to use',
	},
];

export const actorProperties: INodeProperties[] = [
	{
		displayName: 'Start URLs',
		name: 'entries',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		default: {
			entry: [
				{
					value: 'https://docs.apify.com/academy/web-scraping-for-beginners',
				},
			],
		},
		description:
			'One or more URLs of pages where the crawler will start. By default, the Actor will also crawl sub-pages of these URLs. For example, for start URL `https://example.com/blog`, it will crawl also `https://example.com/blog/post` or `https://example.com/blog/article`. The **Include URLs (globs)** option overrides this automation behavior.',
		placeholder: 'Add URL',
		options: [
			{
				name: 'entry',
				displayName: 'Url',
				values: [{ displayName: 'Url', name: 'value', type: 'string', default: '' }],
			},
		],
	},
	{
		displayName: 'Consider URLs From Sitemaps',
		name: 'sitemapUrlsEnabled',
		type: 'boolean',
		default: false,
		description:
			'Whether the crawler should look for [Sitemaps](https://en.wikipedia.org/wiki/Sitemaps) at the domains of the provided *Start URLs* and enqueue matching URLs similarly to links found on crawled pages. You can also reference a `sitemap.xml` file directly by adding it as another Start URL (e.g., `https://www.example.com/sitemap.xml`). This feature makes the crawling more robust on websites that support Sitemaps, as it includes pages that might not be reachable from Start URLs. Note that if a page is found via a Sitemap, it will have depth 1.',
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
	},
	{
		displayName: 'Max Crawling Depth',
		name: 'maxDepth',
		type: 'number',
		default: 20,
		typeOptions: {
			minValue: 0,
		},
		description:
			'The maximum number of links starting from the start URL that the crawler will recursively follow. The start URLs have depth `0`, the pages linked directly from the start URLs have depth `1`, and so on. This setting is useful to prevent accidental crawler runaway. By setting it to `0`, the Actor will only crawl the Start URLs.',
	},
	{
		displayName: 'Max Pages',
		name: 'maxPages',
		type: 'number',
		default: 9999,
		description:
			'The maximum number pages to crawl. It includes the start URLs, pagination pages, pages with no content, etc. The crawler will automatically finish after reaching this number. This setting is useful to prevent accidental crawler runaway.',
	},
];


export const properties: INodeProperties[] = [...actorProperties, ...authenticationProperties];

export function buildActorInput(
	this: IExecuteFunctions,
	i: number,
	defaultInput: Record<string, any>,
): Record<string, any> {
	const entries = this.getNodeParameter('entries', i, {}) as {
		entry?: { value: string }[];
	};
	const crawlerType = this.getNodeParameter('crawlerType', i) as string;
	const sitemapUrlsEnabled = this.getNodeParameter('sitemapUrlsEnabled', i) as boolean;
	const maxDepth = this.getNodeParameter('maxDepth', i) as number;
	const maxPages = this.getNodeParameter('maxPages', i) as number;

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

	return mergedInput;
}
