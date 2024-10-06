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

import { INodePropertyOptions } from 'n8n-workflow'

// @ts-ignore
import * as helpers from '../../../helpers'

import { properties as rawProperties } from './properties'
import { runHooks } from './hooks'

export const name = 'Resurrect run'

const rawOption: INodePropertyOptions = {
  name: 'Resurrect run',
  value: 'Resurrect run',
  action: 'Resurrect run',
  description:
    'DEPRECATED  API endpoints related to run of the Actor were moved under new namespace actor runs Resurrects a finished Actor run and returns an object that contains all the details about the resurrected run  Only finished runs  i e  runs with status FINISHED  FAILED  ABORTED and TIMED OUT can be resurrected  Run status will be updated to RUNNING and its container will be restarted with the same storages  the same behaviour as when the run gets migrated to the new server   For more information  see the Actor docs',
  routing: {
    request: {
      method: 'POST',
      url: '=/v2/acts/{{$parameter["actorId"]}}/runs/{{$parameter["runId"]}}/resurrect',
    },
  },
}

const { properties, option } = runHooks(rawOption, rawProperties)

export { option, properties }
