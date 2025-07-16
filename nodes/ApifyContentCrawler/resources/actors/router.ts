import { IExecuteFunctions, INodeExecutionData, NodeOperationError } from 'n8n-workflow';

import { name as actorResourceName } from './index';
import { name as runActorStandardOperationName } from './run-actor-standard';
import { runActor } from './run-actor-standard/execute';

export async function actorsRouter(
	this: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData | INodeExecutionData[]> {
	const resource = this.getNodeParameter('resource', i);
	const operation = this.getNodeParameter('operation', i);

	if (resource !== actorResourceName) {
		throw new NodeOperationError(
			this.getNode(),
			`Resource ${resource} is not valid for ${actorResourceName}. Please use correct resource.`,
		);
	}

	switch (operation) {
		case runActorStandardOperationName:
			return await runActor.call(this, i);

		default:
			throw new NodeOperationError(
				this.getNode(),
				`Operation ${operation} not found. Please use correct operation.`,
			);
	}
}
