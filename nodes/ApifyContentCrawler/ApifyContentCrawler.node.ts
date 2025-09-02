/* eslint-disable n8n-nodes-base/node-class-description-outputs-wrong */
/* eslint-disable n8n-nodes-base/node-class-description-inputs-wrong-regular-node */

import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';
import { properties } from './ApifyContentCrawler.properties';
import { methods } from './ApifyContentCrawler.methods';
import { actorsRouter } from './resources/actors/router';

export const ACTOR_ID = 'aYG0l9s7dbB7j3gbS';

export class ApifyContentCrawler implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Website Content Crawler by Apify',
		name: 'apifyContentCrawler',
		icon: 'file:apify.svg',
		group: ['transform'],
		// Mismatched version and defaultVersion as a minor hack to hide "Custom API Call" resource
		version: [1],
		defaultVersion: 1,
		subtitle: 'Run Crawler',
		description:
			'Crawl websites and extract text content to feed AI agents, LLM applications, vector databases, or RAG pipelines.',
		defaults: {
			name: 'Website Content Crawler by Apify',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
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

	async execute(this: IExecuteFunctions) {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const data = await actorsRouter.call(this, i);
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
