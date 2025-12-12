/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */

import { INodeProperties } from 'n8n-workflow';

import { aggregateNodeMethods } from '../helpers/genericFunctions';

import { actorProperties as scrapeSingleProperties } from './operations/scrapeSingle.properties';
import { actorProperties as scrapeMultipleProperties } from './operations/scrapeMultiple.properties';


const authenticationProperties: INodeProperties[] = [];

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
			}
		],
		default: 'Website Content Crawler',
	},
];

const properties: INodeProperties[] = [
	...authenticationProperties,
	...resourceSelect,
	...scrapeMultipleProperties,
    ...scrapeSingleProperties
];

const methods = aggregateNodeMethods([
	actors.methods,
	actorTasks.methods,
	actorRuns.methods,
	datasets.methods,
	keyValueStores.methods,
]);

export { properties, methods };
