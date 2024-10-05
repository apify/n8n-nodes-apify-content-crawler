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

export const name = 'Metamorph run'

const rawOption: INodePropertyOptions = {
  name: 'Metamorph run',
  value: 'Metamorph run',
  action: 'Metamorph run',
  description:
    'DEPRECATED    API endpoints related to run of the actor were moved under new namespace   actor runs     reference actor runs  Transforms an actor run into a run of another actor with a new input  This is useful if you want to use another actor to finish the work of your current actor run  without the need to create a completely new run and waiting for its finish  For the users of your actors  the metamorph operation is transparent  they will just see your actor got the work done  There is a limit on how many times you can metamorph a single run  You can check the limit in  the Actor runtime limits  https   docs apify com platform limits actor limits   Internally  the system stops the Docker container corresponding to the actor run and starts a new container using a different Docker image  All the default storages are preserved and the new input is stored under the  INPUT METAMORPH 1  key in the same default key value store  For more information  see the  Actor docs  https   docs apify com platform actors development programming interface metamorph',
  routing: {
    request: {
      method: 'POST',
      url: '=/v2/acts/{{$parameter["actorId"]}}/runs/{{$parameter["runId"]}}/metamorph',
    },
  },
}

const { properties, option } = runHooks(rawOption, rawProperties)

export { option, properties }
