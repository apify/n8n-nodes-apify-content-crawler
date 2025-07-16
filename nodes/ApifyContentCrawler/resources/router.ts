import { IExecuteFunctions, INodeExecutionData, NodeOperationError } from 'n8n-workflow';

import { name as actorResourceName } from './actors';
import { actorsRouter } from './actors/router';

export async function resourceRouter(
	this: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData | INodeExecutionData[]> {
	const resource = this.getNodeParameter('resource', 0);

	switch (resource) {
		case actorResourceName:
			return await actorsRouter.call(this, i);

		default:
			throw new NodeOperationError(this.getNode(), `Resource ${resource} not found`);
	}
}
