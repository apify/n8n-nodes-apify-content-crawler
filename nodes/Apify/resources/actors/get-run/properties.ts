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
    displayName: 'GET /v2/acts/{actorId}/runs/{runId}',
    name: 'operation',
    type: 'notice',
    typeOptions: {
      theme: 'info',
    },
    default: '',
    displayOptions: {
      show: {
        resource: ['Actors'],
        operation: ['Get run'],
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
        operation: ['Get run'],
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
        operation: ['Get run'],
      },
    },
  },
  {
    displayName: 'Wait For Finish',
    name: 'waitForFinish',
    description:
      'The maximum number of seconds the server waits for the run to finish. By\ndefault it is `0`, the maximum value is `60`. <!--\nMAX_ACTOR_JOB_ASYNC_WAIT_SECS -->\n                                         If the build finishes in time then the returned run object will have a terminal status (e.g. `SUCCEEDED`),\n                                         otherwise it will have a transitional status (e.g. `RUNNING`).\n',
    default: 60,
    type: 'number',
    routing: {
      request: {
        qs: {
          waitForFinish: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Actors'],
        operation: ['Get run'],
      },
    },
  },
]
