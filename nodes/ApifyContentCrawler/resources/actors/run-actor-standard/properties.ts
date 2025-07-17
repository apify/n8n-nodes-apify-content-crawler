import { INodeProperties } from 'n8n-workflow';

export const properties: INodeProperties[] = [
	{
		displayName: 'Actor Source',
		name: 'actorSource',
		type: 'hidden',
		default: 'recentlyUsed',
		displayOptions: {
			show: {
				resource: ['Actors'],
				operation: ['Run Actor Standard'],
			},
		},
	},
	{
		displayName: 'Start URLs',
		name: 'startUrls',
		type: 'string',
		default: 'https://docs.apify.com/academy/web-scraping-for-beginners',
		description: 'List of URLs to start crawling from (comma-separated or JSON array)',
		placeholder: '["https://example.com", "https://another.com"]',
		displayOptions: {
			show: {
				resource: ['Actors'],
				operation: ['Run Actor Standard'],
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
				value: 'playwright:adaptive' 
			},
			{ 
				name: 'Headless Browser (Firefox+Playwright) - Reliable, Renders JavaScript Content, Best in Avoiding Blocking, but Might Be Slow.', 
				value: 'playwright:firefox' 
			},
			{ 
				name: 'Raw HTTP Client (Cheerio) - Fastest, but Doesn\'t Render JavaScript Content.', 
				value: 'cheerio' 
			},
		],
		description: 'Adaptive switching between browser and raw HTTP (default) - Fast and renders JavaScript content if present. This is the recommended option.\nHeadless web browser with Firefox and Playwright - Useful for modern websites with anti-scraping protections and JavaScript rendering. It recognizes common blocking patterns like CAPTCHAs and automatically retries blocked requests through new sessions.\nRaw HTTP client - High-performance crawling mode that uses raw HTTP requests to fetch the pages. It is faster and cheaper, but it might not work on all websites.',
		displayOptions: {
			show: {
				resource: ['Actors'],
				operation: ['Run Actor Standard'],
			},
		},
	},
];
