import { ACTOR_ID, ApifyContentCrawler } from '../ApifyContentCrawler.node';
import { executeWorkflow } from './utils/executeWorkflow';
import { CredentialsHelper } from './utils/credentialHelper';
import { getRunTaskDataByNodeName, getTaskData } from './utils/getNodeResultData';
import nock from 'nock';
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
			it('should run the run-actor workflow and wait for finish', async () => {
				const mockRunActor = fixtures.runActorResult();
				const mockBuild = fixtures.getBuildResult();
				const mockFinishedRun = fixtures.getSuccessRunResult();
				const mockResultDataset = fixtures.getDatasetItems();

				const scope = nock('https://api.apify.com')
					.get(`/v2/acts/${ACTOR_ID}/builds/default`)
					.reply(200, mockBuild)
					.post(`/v2/acts/${ACTOR_ID}/runs`)
					.query({ waitForFinish: 0 })
					.reply(200, mockRunActor)
					.get('/v2/actor-runs/5rsC83CHinQwPlsSI')
					.reply(200, mockFinishedRun)
					.get('/v2/datasets/63kMAihbWVgBvEAZ2/items')
					.reply(200, mockResultDataset);

				const runActorWorkflow = require('./workflows/actors/run-actor.workflow.json');
				const { executionData } = await executeWorkflow({
					credentialsHelper,
					workflow: runActorWorkflow,
				});
				const nodeResults = getRunTaskDataByNodeName(executionData, 'Crawl a Website (Standard Settings)');
				expect(nodeResults.length).toBe(1);
				const [nodeResult] = nodeResults;
				expect(nodeResult.executionStatus).toBe('success');

				const data = getTaskData(nodeResult);
				console.log("mmmmmm")
				console.log(data?.['0']);
				expect(typeof data).toBe('object');
				const first = data?.['0'] as { json: any };
				expect(first.json).toEqual(mockResultDataset[0]);
				console.log('Pending mocks:', scope.pendingMocks());

				expect(scope.isDone()).toBe(true);
			});
		});
	});
});
