
import {
	ICredentialDataDecryptedObject,
	ICredentialsHelper,
	INodeProperties,
	IHttpRequestOptions,
	IHttpRequestHelper,
	IRequestOptionsSimplified,
	INode,
	Workflow,
} from 'n8n-workflow';

export class CredentialsHelper implements ICredentialsHelper {
	constructor(private credentials: Record<string, ICredentialDataDecryptedObject>) {}

	getParentTypes(name: string): string[] {
		return [];
	}

	async getDecrypted(): Promise<ICredentialDataDecryptedObject> {
		return this.credentials['apifyApi'];
	}

	async getCredentials(): Promise<any> {
		return {};
	}

	async updateCredentials(): Promise<void> {}

	getCredentialsProperties(type: string): INodeProperties[] {
		return [];
	}

	async authenticate(
		credentials: ICredentialDataDecryptedObject,
		typeName: string,
		requestOptions: IHttpRequestOptions | IRequestOptionsSimplified,
		workflow: Workflow,
		node: INode,
	): Promise<IHttpRequestOptions> {
		// For testing, just return requestOptions as-is
		return requestOptions as IHttpRequestOptions;
	}

	async preAuthentication(
		helpers: IHttpRequestHelper,
		credentials: ICredentialDataDecryptedObject,
		typeName: string,
		node: INode,
		credentialsExpired: boolean,
	): Promise<ICredentialDataDecryptedObject | undefined> {
		return undefined;
	}
}
