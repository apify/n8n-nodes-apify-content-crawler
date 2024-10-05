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
    displayName: 'POST /v2/acts/{actorId}/runs/{runId}/resurrect',
    name: 'operation',
    type: 'notice',
    typeOptions: {
      theme: 'info',
    },
    default: '',
    displayOptions: {
      show: {
        resource: ['Actors'],
        operation: ['Resurrect run'],
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
        operation: ['Resurrect run'],
      },
    },
  },
  {
    displayName: 'Run Id',
    name: 'runId',
    required: true,
    description: 'Run ID.',
    default: '3KH8gEpp4d8uQSe8T',
    type: 'string',
    displayOptions: {
      show: {
        resource: ['Actors'],
        operation: ['Resurrect run'],
      },
    },
  },
  {
    displayName: 'Build',
    name: 'build',
    description:
      'Specifies the Actor build to run. It can be either a build tag or build\nnumber. By default, the run uses the build specified in the run that is\nbeing resurrected (typically `latest`).\n',
    default: '0.1.234',
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
        operation: ['Resurrect run'],
      },
    },
  },
  {
    displayName: 'Timeout',
    name: 'timeout',
    description:
      'Optional timeout for the run, in seconds. By default, the run uses a\ntimeout specified in the run that is being resurrected.\n',
    default: 60,
    type: 'number',
    routing: {
      request: {
        qs: {
          timeout: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Actors'],
        operation: ['Resurrect run'],
      },
    },
  },
  {
    displayName: 'Memory',
    name: 'memory',
    description:
      'Memory limit for the run, in megabytes. The amount of memory can be set\nto a power of 2 with a minimum of 128. By default, the run uses a memory\nlimit specified in the run that is being resurrected.\n',
    default: 256,
    type: 'number',
    routing: {
      request: {
        qs: {
          memory: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Actors'],
        operation: ['Resurrect run'],
      },
    },
  },
]
