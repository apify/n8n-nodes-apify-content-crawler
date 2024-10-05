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
    displayName: 'POST /v2/actor-tasks/{actorTaskId}/runs',
    name: 'operation',
    type: 'notice',
    typeOptions: {
      theme: 'info',
    },
    default: '',
    displayOptions: {
      show: {
        resource: ['Actor tasks'],
        operation: ['Run task'],
      },
    },
  },
  {
    displayName: 'Actor Task Id',
    name: 'actorTaskId',
    required: true,
    description:
      "Task ID or a tilde-separated owner's username and task's name.",
    default: 'janedoe~my-task',
    type: 'string',
    displayOptions: {
      show: {
        resource: ['Actor tasks'],
        operation: ['Run task'],
      },
    },
  },
  {
    displayName: 'Timeout',
    name: 'timeout',
    description:
      'Optional timeout for the run, in seconds. By default, the run uses a\ntimeout specified in the task settings.\n',
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
        resource: ['Actor tasks'],
        operation: ['Run task'],
      },
    },
  },
  {
    displayName: 'Memory',
    name: 'memory',
    description:
      'Memory limit for the run, in megabytes. The amount of memory can be set\nto a power of 2 with a minimum of 128. By default, the run uses a memory\nlimit specified in the task settings.\n',
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
        resource: ['Actor tasks'],
        operation: ['Run task'],
      },
    },
  },
  {
    displayName: 'Max Items',
    name: 'maxItems',
    description:
      'The maximum number of items that the actor run should return. This is\nuseful for pay-per-result actors, as it allows you to limit the number\nof results that will be charged to your subscription. You can access the\nmaximum number of items in your actor by using the\n`ACTOR_MAX_PAID_DATASET_ITEMS` environment variable.\n',
    default: 1000,
    type: 'number',
    routing: {
      request: {
        qs: {
          maxItems: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Actor tasks'],
        operation: ['Run task'],
      },
    },
  },
  {
    displayName: 'Build',
    name: 'build',
    description:
      'Specifies the actor build to run. It can be either a build tag or build\nnumber. By default, the run uses the build specified in the task\nsettings (typically `latest`).\n',
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
        resource: ['Actor tasks'],
        operation: ['Run task'],
      },
    },
  },
  {
    displayName: 'Wait For Finish',
    name: 'waitForFinish',
    description:
      'The maximum number of seconds the server waits for the run to finish. By\ndefault, it is `0`, the maximum value is `60`. <!--\nMAX_ACTOR_JOB_ASYNC_WAIT_SECS -->\n\nIf the build finishes in time then the returned run object will have a\nterminal status (e.g. `SUCCEEDED`),\n\notherwise it will have a transitional status (e.g. `RUNNING`).\n',
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
        resource: ['Actor tasks'],
        operation: ['Run task'],
      },
    },
  },
  {
    displayName: 'Webhooks',
    name: 'webhooks',
    description:
      'Specifies optional webhooks associated with the actor run, which can be\nused to receive a notification\n\ne.g. when the actor finished or failed. The value is a Base64-encoded\nJSON array of objects defining the webhooks.\n\n**Note**: if you already have a webhook set up for the actor or task,\nyou do not have to add it again here.\n\nFor more information, see [Webhooks documentation](https://docs.apify.com/platform/integrations/webhooks).\n',
    default: 'dGhpcyBpcyBqdXN0IGV4YW1wbGUK...',
    type: 'string',
    routing: {
      request: {
        qs: {
          webhooks: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Actor tasks'],
        operation: ['Run task'],
      },
    },
  },
]
