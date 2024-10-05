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

export const name = 'Update actor'

const rawOption: INodePropertyOptions = {
  name: 'Update actor',
  value: 'Update actor',
  action: 'Update actor',
  description:
    'Updates settings of an Actor using values specified by an Actor object passed as JSON in the POST payload  If the object does not define a specific property  its value will not be updated  The response is the full Actor object as returned by the  Get Actor    reference actors actor object get actor  endpoint  The request needs to specify the  Content Type  application json  HTTP header  When providing your API authentication token  we recommend using the request s  Authorization  header  rather than the URL    More info    introduction authentication    If you want to make your Actor  public  https   docs apify com platform actors publishing  using  isPublic  true   you will need to provide the Actor s  title  and the  categories  under which that Actor will be classified in Apify Store  For this  it s best to use the  constants from our  apify shared js  package  https   github com apify apify shared js blob 2d43ebc41ece9ad31cd6525bd523fb86939bf860 packages consts src consts ts L452 L471',
  routing: {
    request: {
      method: 'PUT',
      url: '=/v2/acts/{{$parameter["actorId"]}}',
    },
  },
}

const { properties, option } = runHooks(rawOption, rawProperties)

export { option, properties }
