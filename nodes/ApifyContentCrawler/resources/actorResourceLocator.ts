import { INodeProperties } from 'n8n-workflow';

function mapProperty(property: INodeProperties): INodeProperties {
	return {
		...property,
	};
}

function createActorSourceProperty(displayOptions: any): INodeProperties {
	return {
		displayOptions,
	} as INodeProperties;
}

export function overrideActorProperties(properties: INodeProperties[]): INodeProperties[] {
	const result: INodeProperties[] = [];

	for (const property of properties) {
		if (property.name === 'actorId') {
			result.push(createActorSourceProperty(property.displayOptions));
			result.push(mapProperty(property));
		} else {
			result.push(property);
		}
	}

	return result;
}
