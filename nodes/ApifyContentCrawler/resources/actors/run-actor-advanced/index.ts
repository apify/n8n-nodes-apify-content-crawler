import { INodePropertyOptions } from 'n8n-workflow';

import { properties as rawProperties } from './properties';
import { runHooks } from './hooks';

export const name = 'Run Actor Advanced';

const rawOption: INodePropertyOptions = {
	name: 'Advanced Settings',
	value: 'Run Actor Advanced',
	action: 'Crawl a Website (Advanced Settings)',
	description: 'Use advanced options for crawling including crawling type, crawling depth, and max pages',
};

const { properties, option } = runHooks(rawOption, rawProperties);

export { option, properties };
