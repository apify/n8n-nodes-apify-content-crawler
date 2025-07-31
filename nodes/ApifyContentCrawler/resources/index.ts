/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */

import { INodeProperties } from 'n8n-workflow';

import { aggregateNodeMethods } from '../helpers/methods';
import { runHooks } from './hooks';

import * as actors from './actors';

const authenticationProperties: INodeProperties[] = [];

const rawProperties: INodeProperties[] = [...authenticationProperties, ...actors.properties];

const { properties, methods: selfMethods } = runHooks(rawProperties);

const methods = aggregateNodeMethods([selfMethods, actors.methods]);

export { properties, methods };
