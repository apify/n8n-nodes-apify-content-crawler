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
			it('should run the run-actor workflow', async () => {
				const mockRunActor = fixtures.runActorResult();
				const mockBuild = fixtures.getBuildResult();

				const scope = nock('https://api.apify.com')
					.get(`/v2/acts/${ACTOR_ID}`)
					.reply(200, fixtures.getActorResult())
					.get(`/v2/acts/${ACTOR_ID}/builds/default`)
					.reply(200, mockBuild)
					.post(`/v2/acts/${ACTOR_ID}/runs`)
					.query({ waitForFinish: 0, build: mockBuild.data.buildNumber, memory: 1024 })
					.reply(200, mockRunActor);

				const runActorWorkflow = require('./workflows/actors/run-actor.workflow.json');
				const { waitPromise } = await executeWorkflow({
					credentialsHelper,
					workflow: runActorWorkflow,
				});
				const result = await waitPromise.promise();

				const nodeResults = getRunTaskDataByNodeName(result, 'Run actor');
				expect(nodeResults.length).toBe(1);
				const [nodeResult] = nodeResults;
				expect(nodeResult.executionStatus).toBe('success');

				const data = getTaskData(nodeResult);
				expect(data).toEqual(mockRunActor.data);

				expect(scope.isDone()).toBe(true);
			});

			// Again if we want to include wait for finish, this should be uncommented.
			// it('should run the run-actor workflow and wait for finish', async () => {
			// 	const mockRunActor = fixtures.runActorResult();
			// 	const mockBuild = fixtures.getBuildResult();
			// 	const mockFinishedRun = fixtures.getSuccessRunResult();

			// 	const scope = nock('https://api.apify.com')
			// 		.get(`/v2/acts/${ACTOR_ID}`)
			// 		.reply(200, fixtures.getActorResult())
			// 		.get(`/v2/acts/${ACTOR_ID}/builds/default`)
			// 		.reply(200, mockBuild)
			// 		.post(`/v2/acts/${ACTOR_ID}/runs`)
			// 		.query({ waitForFinish: 0, build: mockBuild.data.buildNumber, memory: 1024 })
			// 		.reply(200, mockRunActor)
			// 		.get('/v2/actor-runs/Icz6E0IHX0c40yEi7')
			// 		.reply(200, mockFinishedRun);

			// 	const runActorWorkflow = require('./workflows/actors/run-actor-wait-for-finish.workflow.json');
			// 	const { waitPromise } = await executeWorkflow({
			// 		credentialsHelper,
			// 		workflow: runActorWorkflow,
			// 	});
			// 	const result = await waitPromise.promise();

			// 	const nodeResults = getRunTaskDataByNodeName(result, 'Run actor');
			// 	expect(nodeResults.length).toBe(1);
			// 	const [nodeResult] = nodeResults;
			// 	expect(nodeResult.executionStatus).toBe('success');

			// 	const data = getTaskData(nodeResult);
			// 	// exptect polled terminal run as result
			// 	expect(data).not.toEqual(mockRunActor.data);
			// 	expect(data).toEqual(mockFinishedRun.data);

			// 	expect(scope.isDone()).toBe(true);
			// });
		});
	});
});
