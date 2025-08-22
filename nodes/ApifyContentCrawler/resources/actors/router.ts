import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

import { runActor as runActorAdvanced } from './run-actor-advanced/execute';

export async function actorsRouter(
	this: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData | INodeExecutionData[]> {
	return await runActorAdvanced.call(this, i);
}
