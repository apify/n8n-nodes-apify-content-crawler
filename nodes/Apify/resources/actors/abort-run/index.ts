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

export const name = 'Abort run'

const rawOption: INodePropertyOptions = {
  name: 'Abort run',
  value: 'Abort run',
  action: 'Abort run',
  description:
    'DEPRECATED    API endpoints related to run of the Actor were moved under new namespace   actor runs     reference actor runs  Aborts an Actor run and returns an object that contains all the details about the run  Only runs that are starting or running are aborted  For runs with status  FINISHED    FAILED    ABORTING  and  TIMED OUT  this call does nothing',
  routing: {
    request: {
      method: 'POST',
      url: '=/v2/acts/{{$parameter["actorId"]}}/runs/{{$parameter["runId"]}}/abort',
    },
  },
}

const { properties, option } = runHooks(rawOption, rawProperties)

export { option, properties }
