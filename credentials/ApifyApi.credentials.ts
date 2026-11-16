import type { IAuthenticateGeneric, Icon, ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';
import { APIFY_API_URL } from '../nodes/ApifyContentCrawler/helpers/consts';

export class ApifyApi implements ICredentialType {
	name = 'apifyApi';

	displayName = 'Apify API';

	documentationUrl = 'https://docs.apify.com/platform/integrations/n8n';

	icon: Icon = {
		light: 'file:../nodes/ApifyContentCrawler/logo/apify.svg',
		dark: 'file:../nodes/ApifyContentCrawler/logo/apifyDark.svg',
	};

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description:
				'Create an API token for n8n in <a href="https://console.apify.com/settings/integrations?createApiToken=true&for=n8n&utm_source=n8n&utm_medium=integrations" target="_blank">Apify Console</a> and copy it right after creating it — it is shown only once.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	/**
	 * Simple credential test to verify Apify API key
	 */
	test: ICredentialTestRequest = {
		request: {
			method: 'GET',
			url: `${APIFY_API_URL}/v2/me`,
		},
	};
}
