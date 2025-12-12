 

import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
	INodePropertyOptions,
	NodeOperationError,
} from 'n8n-workflow';
import {
	option as scrapeSingleOption,
	properties as scrapeSingleProperties,
	execute as executeSingle,
} from './properties/scrapeSingle';
import {
	option as scrapeMultipleOption,
	properties as scrapeMultipleProperties,
	execute as executeMultiple,
} from './properties/scrapeMultiple';

// Operation options
const operations: INodePropertyOptions[] = [scrapeSingleOption, scrapeMultipleOption];

// Resource selection
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

// Operation selection
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
	options: operations,
};

// Set the default operation
operationSelect.default = operations.length > 0 ? operations[0].value : '';

// Authentication properties
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

// Export properties
export const properties: INodeProperties[] = [
	...authenticationProperties,
	...resourceSelect,
	operationSelect,
	...scrapeSingleProperties,
	...scrapeMultipleProperties,
];

// Export empty methods (no custom methods needed)
export const methods = {};

// Router function
export async function router(
	this: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData | INodeExecutionData[]> {
	const resource = this.getNodeParameter('resource', 0);
	const operation = this.getNodeParameter('operation', i);

	// Since we only have one resource (Website Content Crawler), route directly to operations
	if (resource !== 'Website Content Crawler') {
		throw new NodeOperationError(this.getNode(), `Resource ${resource} not found`);
	}

	switch (operation) {
		case 'Scrape single':
			return await executeSingle.call(this, i);
		case 'Scrape multiple':
			return await executeMultiple.call(this, i);
		default:
			throw new NodeOperationError(
				this.getNode(),
				`Operation ${operation} not found. Please use correct operation.`,
			);
	}
}
