import { INodePropertyOptions } from 'n8n-workflow';

import { properties as rawProperties } from './properties';
import { runHooks } from './hooks';

export const name = 'Run actor';

const rawOption: INodePropertyOptions = {
	name: 'Standard Settings',
	value: 'Run Actor Standard',
	action: 'Crawl a Website (Standard Settings)',
	description: 'Crawl any website with our standard settings.',
};

const { properties, option } = runHooks(rawOption, rawProperties);

export { option, properties };
