 
 

import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';
import { router, methods, properties } from './resources/resources';
import { WEB_CONTENT_SCRAPER_ACTOR_ID } from './helpers/consts';

export const ACTOR_ID = WEB_CONTENT_SCRAPER_ACTOR_ID;

export class ApifyContentCrawler implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Website Content Crawler by Apify',
		name: 'apifyContentCrawler',
		icon: {
			dark: 'file:./logo/apifyDark.svg',
			light: 'file:./logo/apify.svg',
		},
		group: ['transform'],
		// Mismatched version and defaultVersion as a minor hack to hide "Custom API Call" resource
		version: [1],
		defaultVersion: 1,
		subtitle: '={{$parameter["operation"]}}',
		description:
			'Crawl websites and extract text content to feed AI agents, LLM applications, vector databases, or RAG pipelines.',
		defaults: {
			name: 'Website Content Crawler by Apify',
		},
		inputs: ['main'] as NodeConnectionType[],
		outputs: ['main'] as NodeConnectionType[],
		usableAsTool: true,
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

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const data = await router.call(this, i);

				const addPairedItem = (item: INodeExecutionData) => ({
					...item,
					pairedItem: { item: i },
				});

				if (Array.isArray(data)) {
					returnData.push(...data.map(addPairedItem));
				} else {
					returnData.push(addPairedItem(data));
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: error.message },
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
