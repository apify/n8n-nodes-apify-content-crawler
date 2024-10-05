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
    displayName: 'POST /v2/acts/{actorId}/run-sync',
    name: 'operation',
    type: 'notice',
    typeOptions: {
      theme: 'info',
    },
    default: '',
    displayOptions: {
      show: {
        resource: ['Actors'],
        operation: ['With input'],
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
        operation: ['With input'],
      },
    },
  },
  {
    displayName: 'Output Record Key',
    name: 'outputRecordKey',
    description:
      "Key of the record from run's default key-value store to be returned\n                                             in the response. By default, it is `OUTPUT`.",
    default: 'OUTPUT',
    type: 'string',
    routing: {
      request: {
        qs: {
          outputRecordKey: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Actors'],
        operation: ['With input'],
      },
    },
  },
  {
    displayName: 'Timeout',
    name: 'timeout',
    description:
      'Optional timeout for the run, in seconds. By default, the run uses a\ntimeout specified in the default run configuration for the Actor.\n',
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
        operation: ['With input'],
      },
    },
  },
  {
    displayName: 'Memory',
    name: 'memory',
    description:
      'Memory limit for the run, in megabytes. The amount of memory can be set\nto a power of 2 with a minimum of 128. By default, the run uses a memory\nlimit specified in the default run configuration for the Actor.\n',
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
        operation: ['With input'],
      },
    },
  },
  {
    displayName: 'Max Items',
    name: 'maxItems',
    description:
      'The maximum number of items that the Actor run should return. This is\nuseful for pay-per-result Actors, as it allows you to limit the number\nof results that will be charged to your subscription. You can access the\nmaximum number of items in your Actor by using the\n`ACTOR_MAX_PAID_DATASET_ITEMS` environment variable.\n',
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
        resource: ['Actors'],
        operation: ['With input'],
      },
    },
  },
  {
    displayName: 'Build',
    name: 'build',
    description:
      'Specifies the Actor build to run. It can be either a build tag or build\nnumber. By default, the run uses the build specified in the default run\nconfiguration for the Actor (typically `latest`).\n',
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
        operation: ['With input'],
      },
    },
  },
  {
    displayName: 'Webhooks',
    name: 'webhooks',
    description:
      'Specifies optional webhooks associated with the Actor run, which can be\nused to receive a notification\n\ne.g. when the Actor finished or failed. The value is a Base64-encoded\nJSON array of objects defining the webhooks. For more information, see\n\n[Webhooks\ndocumentation](https://docs.apify.com/platform/integrations/webhooks).\n',
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
        resource: ['Actors'],
        operation: ['With input'],
      },
    },
  },
]
