import { INodePropertyOptions } from 'n8n-workflow';

import { properties as rawProperties } from './properties';
import { runHooks } from './hooks';

export const name = 'Scrape multiple';

const rawOption: INodePropertyOptions = {
	name: 'Scrape Multiple',
	value: 'Scrape multiple',
	action: 'Scrape multiple URLs',
	description: 'Crawl multiple starting URLs and extract content',
};

const { properties, option } = runHooks(rawOption, rawProperties);

export { option, properties };
