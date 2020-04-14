import { GitOpsFactory } from '../GitOperations';
import { MockFetchResponse, setResponse } from '../__mocks__/node-fetch';
import { MergeError } from '../../errors';

jest.mock('node-fetch');

describe('GitHub', () => {
  const gitOps = GitOpsFactory.getGitHubImpl('token', 'dummy/repo');

  test('set token and repo', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(gitOps.authToken).toEqual('token');
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(gitOps.repoName).toEqual('dummy/repo');
  });

  const logs: string[] = [];
  console.log = (message: string) => {
    logs.push(message);
  };

  describe('merge', () => {
    test('success', async () => {
      setResponse(new MockFetchResponse(201, '{ "sha": "12345" }'));
      await expect(gitOps.merge('from', 'to')).resolves.toBeUndefined();
      expect(logs).toEqual(['Merged from into to.']);
      logs.splice(0);
    });

    test('fail', async () => {
      setResponse(new MockFetchResponse(409, '{ "message": "conflict" }'));
      await expect(gitOps.merge('from', 'to')).rejects.toEqual(new MergeError('conflict'));
    });

    test('nothing to merge', async () => {
      setResponse(new MockFetchResponse(204, ''));
      await expect(gitOps.merge('from', 'to')).resolves.toBeUndefined();
      expect(logs).toEqual(['Noting to merge. to is up-to-date with from.']);
      logs.splice(0);
    });
  });
});
