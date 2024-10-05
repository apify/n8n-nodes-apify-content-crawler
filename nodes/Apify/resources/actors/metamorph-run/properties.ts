/* eslint-disable n8n-nodes-base/node-param-option-description-identical-to-name */
/* eslint-disable n8n-nodes-base/node-param-display-name-miscased-id */
/* eslint-disable n8n-nodes-base/node-param-display-name-miscased-id */
/* eslint-disable n8n-nodes-base/node-param-description-boolean-without-whether */
/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */

/**
 * The following code was generated create-n8n-nodes tool.
 *
 * This file was automatically generated and should not be edited.
 *
 * If changes are required, please refer to the templates and scripts in the repository.
 * Repository: https://github.com/oneflow-vn/create-n8n-nodes
 */

import { INodeProperties } from 'n8n-workflow'

// @ts-ignore
import * as helpers from '../../../helpers'

export const properties: INodeProperties[] = [
  {
    displayName: 'POST /v2/acts/{actorId}/runs/{runId}/metamorph',
    name: 'operation',
    type: 'notice',
    typeOptions: {
      theme: 'info',
    },
    default: '',
    displayOptions: {
      show: {
        resource: ['Actors'],
        operation: ['Metamorph run'],
      },
    },
  },
  {
    displayName: 'Actor Id',
    name: 'actorId',
    required: true,
    description:
      "Actor ID or a tilde-separated owner's username and Actor name.",
    default: 'janedoe~my-actor',
    type: 'string',
    displayOptions: {
      show: {
        resource: ['Actors'],
        operation: ['Metamorph run'],
      },
    },
  },
  {
    displayName: 'Run Id',
    name: 'runId',
    required: true,
    description: 'Actor run ID.',
    default: '3KH8gEpp4d8uQSe8T',
    type: 'string',
    displayOptions: {
      show: {
        resource: ['Actors'],
        operation: ['Metamorph run'],
      },
    },
  },
  {
    displayName: 'Target Actor Id',
    name: 'targetActorId',
    required: true,
    description:
      'ID of a target Actor that the run should be transformed into.',
    default: 'HDSasDasz78YcAPEB',
    type: 'string',
    routing: {
      request: {
        qs: {
          targetActorId: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Actors'],
        operation: ['Metamorph run'],
      },
    },
  },
  {
    displayName: 'Build',
    name: 'build',
    description:
      'Optional build of the target Actor.\n\nIt can be either a build tag or build number. By default, the run uses\nthe build specified in the default run configuration for the target\nActor (typically `latest`).\n',
    default: 'beta',
    type: 'string',
    routing: {
      request: {
        qs: {
          build: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Actors'],
        operation: ['Metamorph run'],
      },
    },
  },
]
