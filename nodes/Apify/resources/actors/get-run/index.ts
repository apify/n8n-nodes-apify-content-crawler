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

export const name = 'Get run'

const rawOption: INodePropertyOptions = {
  name: 'Get run',
  value: 'Get run',
  action: 'Get run',
  description:
    'DEPRECATED    API endpoints related to run of the Actor were moved under new namespace   actor runs     reference actor runs     DEPRECATED    API endpoints related to run of the Actor were moved under new namespace   actor runs     reference actor runs   Gets an object that contains all the details about a specific run of an Actor  By passing the optional  waitForFinish  parameter the API endpoint will synchronously wait for the run to finish  This is useful to avoid periodic polling when waiting for Actor run to complete  This endpoint does not require the authentication token  Instead  calls are authenticated using a hard to guess ID of the run  However  if you access the endpoint without the token  certain attributes  such as  usageUsd  and  usageTotalUsd   will be hidden',
  routing: {
    request: {
      method: 'GET',
      url: '=/v2/acts/{{$parameter["actorId"]}}/runs/{{$parameter["runId"]}}',
    },
  },
}

const { properties, option } = runHooks(rawOption, rawProperties)

export { option, properties }
