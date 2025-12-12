import { INodePropertyOptions } from 'n8n-workflow';

import { properties as rawProperties } from './properties';
import { runHooks } from './hooks';

export const name = 'Scrape single';

const rawOption: INodePropertyOptions = {
	name: 'Scrape Single',
	value: 'Scrape single',
	action: 'Scrape a single URL',
	description: 'Crawl a single starting URL and extract content',
};

const { properties, option } = runHooks(rawOption, rawProperties);

export { option, properties };
