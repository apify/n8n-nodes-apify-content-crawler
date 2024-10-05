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
    displayName:
      'POST /v2/actor-tasks/{actorTaskId}/run-sync-get-dataset-items',
    name: 'operation',
    type: 'notice',
    typeOptions: {
      theme: 'info',
    },
    default: '',
    displayOptions: {
      show: {
        resource: ['Actor tasks'],
        operation: ['Run task synchronously and get dataset items (POST)'],
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
        operation: ['Run task synchronously and get dataset items (POST)'],
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
        operation: ['Run task synchronously and get dataset items (POST)'],
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
        operation: ['Run task synchronously and get dataset items (POST)'],
      },
    },
  },
  {
    displayName: 'Max Items',
    name: 'maxItems',
    description:
      'The maximum number of items that the task run should return. This is\nuseful for pay-per-result tasks, as it allows you to limit the number of\nresults that will be charged to your subscription. You can access the\nmaximum number of items in your actor by using the\n`ACTOR_MAX_PAID_DATASET_ITEMS` environment variable.\n',
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
        operation: ['Run task synchronously and get dataset items (POST)'],
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
        operation: ['Run task synchronously and get dataset items (POST)'],
      },
    },
  },
  {
    displayName: 'Webhooks',
    name: 'webhooks',
    description:
      'Specifies optional webhooks associated with the actor run, which can be\nused to receive a notification\n\ne.g. when the actor finished or failed. The value is a Base64-encoded\nJSON array of objects defining the webhooks. For more information, see\n\n[Webhooks\ndocumentation](https://docs.apify.com/platform/integrations/webhooks).\n',
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
        operation: ['Run task synchronously and get dataset items (POST)'],
      },
    },
  },
  {
    displayName: 'Format',
    name: 'format',
    description:
      'Format of the results, possible values are: `json`, `jsonl`, `csv`,\n`html`, `xlsx`, `xml` and `rss`. The default value is `json`.\n',
    default: 'json',
    type: 'string',
    routing: {
      request: {
        qs: {
          format: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Actor tasks'],
        operation: ['Run task synchronously and get dataset items (POST)'],
      },
    },
  },
  {
    displayName: 'Clean',
    name: 'clean',
    description:
      'If `true` or `1` then the API endpoint returns only non-empty items and\nskips hidden fields\n\n(i.e. fields starting with the # character).\n\nThe `clean` parameter is just a shortcut for `skipHidden=true` and\n`skipEmpty=true` parameters.\n\nNote that since some objects might be skipped from the output, that the\nresult might contain less items than the `limit` value.\n',
    default: false,
    type: 'boolean',
    routing: {
      request: {
        qs: {
          clean: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Actor tasks'],
        operation: ['Run task synchronously and get dataset items (POST)'],
      },
    },
  },
  {
    displayName: 'Offset',
    name: 'offset',
    description:
      'Number of items that should be skipped at the start. The default value\nis `0`.\n',
    default: 0,
    type: 'number',
    routing: {
      request: {
        qs: {
          offset: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Actor tasks'],
        operation: ['Run task synchronously and get dataset items (POST)'],
      },
    },
  },
  {
    displayName: 'Limit',
    name: 'limit',
    description:
      'Maximum number of items to return. By default there is no limit.',
    default: 99,
    type: 'number',
    routing: {
      request: {
        qs: {
          limit: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Actor tasks'],
        operation: ['Run task synchronously and get dataset items (POST)'],
      },
    },
  },
  {
    displayName: 'Fields',
    name: 'fields',
    description:
      'A comma-separated list of fields which should be picked from the items,\n\nonly these fields will remain in the resulting record objects.\n\nNote that the fields in the outputted items are sorted the same way as\nthey are specified in the `fields` query parameter.\n\nYou can use this feature to effectively fix the output format.\n',
    default: 'myValue,myOtherValue',
    type: 'string',
    routing: {
      request: {
        qs: {
          fields: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Actor tasks'],
        operation: ['Run task synchronously and get dataset items (POST)'],
      },
    },
  },
  {
    displayName: 'Omit',
    name: 'omit',
    description:
      'A comma-separated list of fields which should be omitted from the items.',
    default: 'myValue,myOtherValue',
    type: 'string',
    routing: {
      request: {
        qs: {
          omit: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Actor tasks'],
        operation: ['Run task synchronously and get dataset items (POST)'],
      },
    },
  },
  {
    displayName: 'Unwind',
    name: 'unwind',
    description:
      'A comma-separated list of fields which should be unwound, in order which\nthey should be processed. Each field should be either an array or an object.\n\nIf the field is an array then every element of\n\nthe array will become a separate record and merged with parent object.\n\nIf the unwound field is an object then it is merged with the parent\nobject\n\nIf the unwound field is missing or its value is neither an array nor an\nobject and therefore cannot be merged with a parent object then the item\ngets preserved as it is.\n\nNote that the unwound items ignore the `desc` parameter.\n',
    default: 'myValue,myOtherValue',
    type: 'string',
    routing: {
      request: {
        qs: {
          unwind: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Actor tasks'],
        operation: ['Run task synchronously and get dataset items (POST)'],
      },
    },
  },
  {
    displayName: 'Flatten',
    name: 'flatten',
    description:
      'A comma-separated list of fields which should transform nested objects\ninto flat structures.\n\nFor example, with `flatten="foo"` the object `{"foo":{"bar": "hello"}}`\nis turned into `{"foo.bar": "hello"}`.\n\nThe original object with properties is replaced with the flattened\nobject.\n',
    default: 'myValue',
    type: 'string',
    routing: {
      request: {
        qs: {
          flatten: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Actor tasks'],
        operation: ['Run task synchronously and get dataset items (POST)'],
      },
    },
  },
  {
    displayName: 'Desc',
    name: 'desc',
    description:
      'By default, results are returned in the same order as they were stored.\nTo reverse the order, set this parameter to `true` or `1`.\n',
    default: true,
    type: 'boolean',
    routing: {
      request: {
        qs: {
          desc: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Actor tasks'],
        operation: ['Run task synchronously and get dataset items (POST)'],
      },
    },
  },
  {
    displayName: 'Attachment',
    name: 'attachment',
    description:
      'If `true` or `1` then the response will define the `Content-Disposition:\nattachment` header, forcing a web browser to download the file rather\nthan to display it. By default this header is not present.\n',
    default: true,
    type: 'boolean',
    routing: {
      request: {
        qs: {
          attachment: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Actor tasks'],
        operation: ['Run task synchronously and get dataset items (POST)'],
      },
    },
  },
  {
    displayName: 'Delimiter',
    name: 'delimiter',
    description:
      'A delimiter character for CSV files, only used if `format=csv`. You\nmight need to URL-encode the character (e.g. use `%09` for tab or `%3B`\nfor semicolon). The default delimiter is a simple comma (`,`).\n',
    default: ';',
    type: 'string',
    routing: {
      request: {
        qs: {
          delimiter: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Actor tasks'],
        operation: ['Run task synchronously and get dataset items (POST)'],
      },
    },
  },
  {
    displayName: 'Bom',
    name: 'bom',
    description:
      'All text responses are encoded in UTF-8 encoding. By default, the\n`format=csv` files are prefixed with\n\nthe UTF-8 Byte Order Mark (BOM), while `json`, `jsonl`, `xml`, `html`\nand `rss` files are not.\n\nIf you want to override this default behavior, specify `bom=1` query\nparameter to include the BOM or `bom=0` to skip it.\n',
    default: false,
    type: 'boolean',
    routing: {
      request: {
        qs: {
          bom: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Actor tasks'],
        operation: ['Run task synchronously and get dataset items (POST)'],
      },
    },
  },
  {
    displayName: 'Xml Root',
    name: 'xmlRoot',
    description:
      'Overrides default root element name of `xml` output. By default the root\nelement is `items`.\n',
    default: 'items',
    type: 'string',
    routing: {
      request: {
        qs: {
          xmlRoot: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Actor tasks'],
        operation: ['Run task synchronously and get dataset items (POST)'],
      },
    },
  },
  {
    displayName: 'Xml Row',
    name: 'xmlRow',
    description:
      'Overrides default element name that wraps each page or page function\nresult object in `xml` output. By default the element name is `item`.\n',
    default: 'item',
    type: 'string',
    routing: {
      request: {
        qs: {
          xmlRow: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Actor tasks'],
        operation: ['Run task synchronously and get dataset items (POST)'],
      },
    },
  },
  {
    displayName: 'Skip Header Row',
    name: 'skipHeaderRow',
    description:
      'If `true` or `1` then header row in the `csv` format is skipped.',
    default: true,
    type: 'boolean',
    routing: {
      request: {
        qs: {
          skipHeaderRow: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Actor tasks'],
        operation: ['Run task synchronously and get dataset items (POST)'],
      },
    },
  },
  {
    displayName: 'Skip Hidden',
    name: 'skipHidden',
    description:
      'If `true` or `1` then hidden fields are skipped from the output,\ni.e. fields starting with the `#` character.',
    default: false,
    type: 'boolean',
    routing: {
      request: {
        qs: {
          skipHidden: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Actor tasks'],
        operation: ['Run task synchronously and get dataset items (POST)'],
      },
    },
  },
  {
    displayName: 'Skip Empty',
    name: 'skipEmpty',
    description:
      'If `true` or `1` then empty items are skipped from the output.\n\nNote that if used, the results might contain less items than the limit\nvalue.\n',
    default: false,
    type: 'boolean',
    routing: {
      request: {
        qs: {
          skipEmpty: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Actor tasks'],
        operation: ['Run task synchronously and get dataset items (POST)'],
      },
    },
  },
  {
    displayName: 'Simplified',
    name: 'simplified',
    description:
      "If `true` or `1` then, the endpoint applies the\n`fields=url,pageFunctionResult,errorInfo`\n\nand `unwind=pageFunctionResult` query parameters. This feature is used\nto emulate simplified results provided by the\n\nlegacy Apify Crawler product and it's not recommended to use it in new\nintegrations.\n",
    default: false,
    type: 'boolean',
    routing: {
      request: {
        qs: {
          simplified: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Actor tasks'],
        operation: ['Run task synchronously and get dataset items (POST)'],
      },
    },
  },
  {
    displayName: 'Skip Failed Pages',
    name: 'skipFailedPages',
    description:
      "If `true` or `1` then, the all the items with errorInfo property will be\nskipped from the output.\n\nThis feature is here to emulate functionality of API version 1 used for\nthe legacy Apify Crawler product and it's not recommended to use it in\nnew integrations.\n",
    default: false,
    type: 'boolean',
    routing: {
      request: {
        qs: {
          skipFailedPages: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Actor tasks'],
        operation: ['Run task synchronously and get dataset items (POST)'],
      },
    },
  },
]
