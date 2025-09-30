import {
	ICredentialsHelper,
	IExecuteFunctions,
	IExecuteSingleFunctions,
	INodeExecutionData,
	IRun,
	ITaskData,
} from 'n8n-workflow';
import { nodeTypes } from './nodeTypesClass';
import * as fixtures from './fixtures';

export type ExecuteWorkflowArgs = {
	workflow: any;
	credentialsHelper: ICredentialsHelper;
};

export const executeWorkflow = async ({
	credentialsHelper,
	workflow: workflowJson,
}: ExecuteWorkflowArgs): Promise<{ executionData: IRun }> => {
	// Pick the first node (your crawler)
	const [node] = workflowJson.nodes;

	// Minimal fake executeFunctions
	const fakeExecuteFunctions = {
		getCredentials: async (name: string) => {
			return credentialsHelper.getDecrypted({} as any, { name } as any, name, 'manual');
		},
		getNodeParameter: (parameterName: string) => {
			return node.parameters[parameterName];
		},
		getInputData: (): INodeExecutionData[] => {
			// Provide at least one empty item so loops like `for (let i = 0; i < items.length; i++)`
			// still work
			return [{ json: {} }];
		},
		continueOnFail: () => {
			return false;
		},
		getNode: () => {
			return node;
		},
		helpers: {
			requestWithAuthentication: async function (
				this: IExecuteFunctions,
				_credentialType: string,
				options: any,
			) {
				const url = options.url as string;

				if (url.includes('/builds/default')) {
					return fixtures.getBuildResult();
				}
				if (url.includes('/runs')) {
					return fixtures.runActorResult();
				}
				if (url.includes('/actor-runs/')) {
					return fixtures.getSuccessRunResult();
				}
				if (url.includes('/actors/')) {
					return fixtures.getActorResult();
				}
				if (url.includes('/datasets/')) {
					return fixtures.getDatasetItems();
				}

				throw new Error(`Unhandled request in fixture stub: ${url}`);
			},
			returnJsonArray: (items: any[]) => {
				return items.map((i) => ({ json: i }));
			},
			constructExecutionMetaData: (inputData: any, _options: any) => {
				return inputData;
			},
		},
	} as unknown as IExecuteFunctions & IExecuteSingleFunctions;

	// Run the node directly
	const nodeType = nodeTypes.getByNameAndVersion(node.type, node.typeVersion);
	if (!('execute' in nodeType) || typeof nodeType.execute !== 'function') {
		throw new Error(`Node ${node.type} has no execute() method`);
	}
	const result = await (nodeType.execute as Function).call(fakeExecuteFunctions);

	// Build fake ITaskData
	const taskData: ITaskData = {
		startTime: Date.now(),
		executionTime: 1,
		executionStatus: 'success',
		data: { main: result as any },
		source: [
			{
				previousNode: '',
			},
		],
	};

	// Wrap in fake IRun-like structure
	const executionData: IRun = {
		mode: 'manual',
		status: 'success',
		data: {
			resultData: {
				runData: {
					[node.name]: [taskData],
				},
			},
		},
		finished: true,
		startedAt: new Date(),
		stoppedAt: new Date(),
	};

	return { executionData };
};
