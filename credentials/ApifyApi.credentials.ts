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
