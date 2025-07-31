import { INodeProperties, INodeType } from 'n8n-workflow';

import { overrideActorProperties } from './actorResourceLocator';
import { compose } from './genericFunctions';

export function runHooks(properties: INodeProperties[]): {
	properties: INodeProperties[];
	methods: INodeType['methods'];
} {
	const processProperties = compose(overrideActorProperties);

	return {
		properties: processProperties(properties),
		methods: {
			listSearch: {},
		},
	};
}
