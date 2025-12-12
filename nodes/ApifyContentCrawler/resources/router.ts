import { IExecuteFunctions, INodeExecutionData, NodeOperationError } from 'n8n-workflow';

import { name as websiteContentCrawlerResourceName } from './website-content-crawler';
import { websiteContentCrawlerRouter } from './website-content-crawler/router';

export async function resourceRouter(
	this: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData | INodeExecutionData[]> {
	const resource = this.getNodeParameter('resource', 0);

	switch (resource) {
		case websiteContentCrawlerResourceName:
			return await websiteContentCrawlerRouter.call(this, i);

		default:
			throw new NodeOperationError(this.getNode(), `Resource ${resource} not found`);
	}
}
