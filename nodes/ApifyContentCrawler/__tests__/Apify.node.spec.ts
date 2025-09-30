import { ApifyContentCrawler } from '../ApifyContentCrawler.node';
import { executeWorkflow } from './utils/executeWorkflow';
import { CredentialsHelper } from './utils/credentialHelper';
import { getRunTaskDataByNodeName, getTaskData } from './utils/getNodeResultData';
import * as fixtures from './utils/fixtures';

describe('Apify Node', () => {
	let apifyNode: ApifyContentCrawler;
	let credentialsHelper: CredentialsHelper;

	beforeEach(() => {
		apifyNode = new ApifyContentCrawler();
		credentialsHelper = new CredentialsHelper({
			apifyApi: {
				apiToken: 'test-token',
				baseUrl: 'https://api.apify.com',
			},
		});
	});

	describe('description', () => {
		it('should have a name property', () => {
			expect(apifyNode.description.name).toBeDefined();
			expect(apifyNode.description.name).toEqual('apifyContentCrawler');
		});

		it('should have properties defined', () => {
			expect(apifyNode.description.properties).toBeDefined();
		});

		it('should have credential properties defined', () => {
			expect(apifyNode.description.credentials).toBeDefined();
		});
	});

	describe('actors', () => {
		describe('run-actor', () => {
			const mockResultDataset = fixtures.getDatasetItems();

			const tests = [
			{
				name: 'Advanced Workflow',
				workflowJsonName: 'run-actor-advanced.workflow.json',
				nodeName: 'Crawl a Website (Advanced Settings)',
			},
			];

			test.each(tests)(
			'$name should run the WCC actor correctly',
			async ({ workflowJsonName, nodeName }) => {
				const workflow = require(`./workflows/actors/${workflowJsonName}`);
				const { executionData } = await executeWorkflow({
				credentialsHelper,
				workflow,
				});

				const nodeResults = getRunTaskDataByNodeName(executionData, nodeName);
				expect(nodeResults.length).toBe(1);

				const [nodeResult] = nodeResults;
				expect(nodeResult.executionStatus).toBe('success');

				const data = getTaskData(nodeResult);
				expect(typeof data).toBe('object');

				expect(data).toEqual(mockResultDataset[0]);
			},
		);
		});
	});
});
