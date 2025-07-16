import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { properties } from './ApifyContentCrawler.properties';
import { methods } from './ApifyContentCrawler.methods';
import { resourceRouter } from './resources/router';

export class ApifyContentCrawler implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Apify Scraper for AI Crawling',
		name: 'apifyContentCrawler',
		icon: 'file:apify.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description:
			'Crawl any website and extract text content to feed AI Workflows or LLM applications.',
		defaults: {
			name: 'Apify Content Crawler',
	},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				displayName: 'Apify API key connection',
				name: 'apifyApi',
				required: false,
				displayOptions: {
					show: {
						authentication: ['apifyApi'],
					},
				},
			},
			{
				displayName: 'Apify OAuth2 connection',
				name: 'apifyOAuth2Api',
				required: false,
				displayOptions: {
					show: {
						authentication: ['apifyOAuth2Api'],
					},
				},
			},
		],

		properties,
	};

	methods = methods;

	async execute(this: IExecuteFunctions) {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const data = await resourceRouter.call(this, i);
			// `data` may be an array of items or a single item, so we either push the spreaded array or the single item
			if (Array.isArray(data)) {
				returnData.push(...data);
			} else {
				returnData.push(data);
			}
		}

		return [returnData];
	}
}
