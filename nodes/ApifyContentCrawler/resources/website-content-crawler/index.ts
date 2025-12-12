import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { runHooks } from './hooks';

import * as scrapeSingle from './scrape-single';
import * as scrapeMultiple from './scrape-multiple';

const operations: INodePropertyOptions[] = [
	scrapeSingle.option,
	scrapeMultiple.option,
];

export const name = 'Website Content Crawler';

const operationSelect: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['Website Content Crawler'],
		},
	},
	default: '',
};

// overwrite the options of the operationSelect
operationSelect.options = operations;

// set the default operation
operationSelect.default = operations.length > 0 ? operations[0].value : '';

export const rawProperties: INodeProperties[] = [
	operationSelect,
	...scrapeSingle.properties,
	...scrapeMultiple.properties,
];

const { properties, methods } = runHooks(rawProperties);

export { properties, methods };
