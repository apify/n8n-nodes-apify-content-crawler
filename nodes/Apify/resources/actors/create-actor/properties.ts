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
    displayName: 'POST /v2/acts',
    name: 'operation',
    type: 'notice',
    typeOptions: {
      theme: 'info',
    },
    default: '',
    displayOptions: {
      show: {
        resource: ['Actors'],
        operation: ['Create actor'],
      },
    },
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    default: 'MyActor',
    description: undefined,
    routing: {
      request: {
        body: {
          name: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      hide: {
        useCustomBody: [true],
      },
      show: {
        resource: ['Actors'],
        operation: ['Create actor'],
      },
    },
  },
  {
    displayName: 'Description',
    name: 'description',
    type: 'string',
    default: 'My favourite actor!',
    description: undefined,
    routing: {
      request: {
        body: {
          description: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      hide: {
        useCustomBody: [true],
      },
      show: {
        resource: ['Actors'],
        operation: ['Create actor'],
      },
    },
  },
  {
    displayName: 'Title',
    name: 'title',
    type: 'string',
    default: 'My actor',
    description: undefined,
    routing: {
      request: {
        body: {
          title: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      hide: {
        useCustomBody: [true],
      },
      show: {
        resource: ['Actors'],
        operation: ['Create actor'],
      },
    },
  },
  {
    displayName: 'Is Public',
    name: 'isPublic',
    type: 'boolean',
    default: false,
    description: undefined,
    routing: {
      request: {
        body: {
          isPublic: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      hide: {
        useCustomBody: [true],
      },
      show: {
        resource: ['Actors'],
        operation: ['Create actor'],
      },
    },
  },
  {
    displayName: 'Seo Title',
    name: 'seoTitle',
    type: 'string',
    default: 'My actor',
    description: undefined,
    routing: {
      request: {
        body: {
          seoTitle: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      hide: {
        useCustomBody: [true],
      },
      show: {
        resource: ['Actors'],
        operation: ['Create actor'],
      },
    },
  },
  {
    displayName: 'Seo Description',
    name: 'seoDescription',
    type: 'string',
    default: 'My actor is the best',
    description: undefined,
    routing: {
      request: {
        body: {
          seoDescription: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      hide: {
        useCustomBody: [true],
      },
      show: {
        resource: ['Actors'],
        operation: ['Create actor'],
      },
    },
  },
  {
    displayName: 'Restart On Error',
    name: 'restartOnError',
    type: 'boolean',
    default: false,
    description: undefined,
    routing: {
      request: {
        body: {
          restartOnError: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      hide: {
        useCustomBody: [true],
      },
      show: {
        resource: ['Actors'],
        operation: ['Create actor'],
      },
    },
  },
  {
    displayName: 'Versions',
    name: 'versions',
    type: 'fixedCollection',
    default: [],
    typeOptions: {
      multipleValues: true,
    },
    description: '',
    placeholder: 'Add item',
    options: [
      {
        displayName: 'Items',
        name: 'items',
        values: [
          {
            displayName: 'Item',
            type: 'collection',
            default: {},
            typeOptions: {},
            name: 'item',
            description: '',
            placeholder: 'Add item',
            options: [
              {
                displayName: 'Versionnumber',
                type: 'string',
                default: '0.0',
                description: '',
                name: 'versionNumber',
              },
              {
                displayName: 'Sourcetype',
                type: 'string',
                default: '',
                description: '',
                name: 'sourceType',
              },
              {
                displayName: 'Envvars',
                type: 'fixedCollection',
                default: [],
                typeOptions: {
                  multipleValues: true,
                },
                name: 'envVars',
                description: '',
                placeholder: 'Add item',
                options: [
                  {
                    displayName: 'Items',
                    name: 'items',
                    values: [
                      {
                        displayName: 'Name',
                        type: 'string',
                        default: 'MY_ENV_VAR',
                        description: '',
                        name: 'name',
                      },
                      {
                        displayName: 'Value',
                        type: 'string',
                        default: 'my-value',
                        description: '',
                        name: 'value',
                      },
                      {
                        displayName: 'Issecret',
                        type: 'boolean',
                        default: false,
                        description: '',
                        name: 'isSecret',
                      },
                    ],
                  },
                ],
              },
              {
                displayName: 'Applyenvvarstobuild',
                type: 'boolean',
                default: false,
                description: '',
                name: 'applyEnvVarsToBuild',
              },
              {
                displayName: 'Buildtag',
                type: 'string',
                default: 'latest',
                description: '',
                name: 'buildTag',
              },
              {
                displayName: 'Sourcefiles',
                type: 'json',
                default:
                  '[\n  {\n    "format": "TEXT",\n    "content": "console.log(\'This is the main.js file\');",\n    "name": "src/main.js"\n  }\n]',
                description: '',
                name: 'sourceFiles',
              },
            ],
          },
        ],
      },
    ],
    routing: {
      request: {
        body: {
          versions: '={{$value.items}}',
        },
      },
    },
    displayOptions: {
      hide: {
        useCustomBody: [true],
      },
      show: {
        resource: ['Actors'],
        operation: ['Create actor'],
      },
    },
  },
  {
    displayName: 'Categories',
    name: 'categories',
    type: 'fixedCollection',
    default: [],
    typeOptions: {
      multipleValues: true,
    },
    description: '',
    placeholder: 'Add item',
    options: [
      {
        displayName: 'Items',
        name: 'items',
        values: [
          {
            displayName: 'Item',
            name: 'Item',
            type: 'string',
            default: '',
          },
        ],
      },
    ],
    routing: {
      request: {
        body: {
          categories: '={{$value.items}}',
        },
      },
    },
    displayOptions: {
      hide: {
        useCustomBody: [true],
      },
      show: {
        resource: ['Actors'],
        operation: ['Create actor'],
      },
    },
  },
  {
    displayName: 'Default Run Options',
    name: 'defaultRunOptions',
    type: 'string',
    default: '',
    description: undefined,
    routing: {
      request: {
        body: {
          defaultRunOptions: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      hide: {
        useCustomBody: [true],
      },
      show: {
        resource: ['Actors'],
        operation: ['Create actor'],
      },
    },
  },
]
