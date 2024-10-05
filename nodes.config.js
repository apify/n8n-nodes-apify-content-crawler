const path = require('path');

module.exports = {
	packageName: 'n8n-nodes-apify',
	credentials: {
		ApifyApi: {
			displayName: 'Apify API',
			name: 'apifyApi',
			className: 'ApifyApi',
			scheme: 'apiKey',
		},
	},
	nodes: {
		Apify: {
			displayName: 'Apify',
			name: 'Apify',
			description: 'Apify API',
			api: path.resolve(__dirname, 'openapi.yaml'),
			icon: './icons/apify.png',
			tags: [
				'Actors/Actor collection',
				'Actors/Actor object',
				'Actors/Run collection',
				'Actors/Run actor synchronously',
				'Actors/Run Actor synchronously and get dataset items',
				'Actors/Run object',
				'Actors/Abort run',
				'Actors/Metamorph run',
				'Actors/Resurrect run',
				'Actors/Last run object and its storages',

				'Actor tasks/Task collection',
				'Actor tasks/Task object',
				'Actor tasks/Task input object',
				'Actor tasks/Run collection',
				'Actor tasks/Run task synchronously',
				'Actor tasks/Run task synchronously and get dataset items',
				'Actor tasks/Last run object and its storages',

				'Datasets',
				'Datasets/Dataset collection',
				'Datasets/Dataset',
				'Datasets/Item collection',
			],
			tagsExclude: [],
			baseUrl: 'https://api.apify.com',
			credentials: [
				{
					displayName: 'Apify API',
					name: 'apifyApi',
					required: true,
				},
			],
		},
	},
	overwrites: {
		operations: [
			{
				match: {
					name: 'resource',
				},
				set: function (operation) {
					operation.options = operation.options.map((option) => {
						return {
							...option,
							description: '',
						};
					});
					return operation;
				},
			},
			{
				match: {
					name: 'offset',
				},
				set: {
					default: 0,
				}
			}
		],
	},
	operationNameFn: (name) => {
		// split by /
		// const parts = name.split('/');
		// return parts[1];
		return name;
	},
	resourceNameFn: (name, opName) => {
		// split by /
		const parts = name.split('/');
		return parts[0];
	},
	actionNameFn: (name, opName) => {
		// split by /
		// const parts = name.split('/');
		return opName
	},
};
