/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */

import { INodeProperties } from 'n8n-workflow';

import { aggregateNodeMethods } from '../helpers/methods';

import * as websiteContentCrawler from './website-content-crawler';

const resourceSelect: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Website Content Crawler',
				value: 'Website Content Crawler',
			},
		],
		default: 'Website Content Crawler',
	},
];

const properties: INodeProperties[] = [
	...resourceSelect,
	...websiteContentCrawler.properties,
];

const methods = aggregateNodeMethods([
	websiteContentCrawler.methods,
]);

export { properties, methods };
