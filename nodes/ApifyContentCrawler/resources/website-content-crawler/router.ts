import { IExecuteFunctions, INodeExecutionData, NodeOperationError } from 'n8n-workflow';

import { name as websiteContentCrawlerResourceName } from './index';
import { name as scrapeSingleOperationName } from './scrape-single';
import { name as scrapeMultipleOperationName } from './scrape-multiple';
import { scrapeSingle } from './scrape-single/execute';
import { scrapeMultiple } from './scrape-multiple/execute';

export async function websiteContentCrawlerRouter(
	this: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData | INodeExecutionData[]> {
	const resource = this.getNodeParameter('resource', i);
	const operation = this.getNodeParameter('operation', i);

	if (resource !== websiteContentCrawlerResourceName) {
		throw new NodeOperationError(
			this.getNode(),
			`Resource ${resource} is not valid for ${websiteContentCrawlerResourceName}. Please use correct resource.`,
		);
	}

	switch (operation) {
		case scrapeSingleOperationName:
			return await scrapeSingle.call(this, i);
		case scrapeMultipleOperationName:
			return await scrapeMultiple.call(this, i);

		default:
			throw new NodeOperationError(
				this.getNode(),
				`Operation ${operation} not found. Please use correct operation.`,
			);
	}
}
