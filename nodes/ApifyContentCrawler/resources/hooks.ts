import { INodeProperties, INodeType } from 'n8n-workflow';

import { overrideActorProperties, listActors } from './actorResourceLocator';
import { overrideActorTaskProperties, listActorTasks } from './actorTaskResourceLocator';
import { overrideRunProperties, listRuns } from './runResourceLocator';
import {
	listKeyValueStores,
	overrideKeyValueStoreProperties,
} from './keyValueStoreResourceLocator';
import {
	listKeyValueStoreRecordKeys,
	overrideKeyValueStoreRecordKeyProperties,
} from './keyValueStoreRecordKeyResourceLocator';
import { compose } from './genericFunctions';

export function runHooks(properties: INodeProperties[]): {
	properties: INodeProperties[];
	methods: INodeType['methods'];
} {
	const processProperties = compose(
		overrideActorProperties,
		overrideActorTaskProperties,
		overrideRunProperties,
		overrideKeyValueStoreProperties,
		overrideKeyValueStoreRecordKeyProperties,
	);

	return {
		properties: processProperties(properties),
		methods: {
			listSearch: {
				listActors,
				listActorTasks,
				listRuns,
				listKeyValueStores,
				listKeyValueStoreRecordKeys,
			},
		},
	};
}
