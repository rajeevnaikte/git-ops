import { GitOperations } from '../GitOperations';
import { MergeError } from '../../errors';
import fetch from 'node-fetch';

const GITHUB_API_URL = 'https://api.github.com';

/**
 * Git operations using GitHub API.
 */
export class GitHub implements GitOperations {
  private readonly authToken: string;
  private readonly repoName: string;

  constructor (authToken: string, repoName: string) {
    this.authToken = authToken;
    this.repoName = repoName;
  }

  /**
   * Merge branch in GitHub server.
   * @param from
   * @param to
   * @throws {MergeError} if merge failed
   */
  async merge (from: string, to: string): Promise<void> {
    const response = await fetch(`${GITHUB_API_URL}/repos/${this.repoName}/merges`, {
      method: 'POST',
      headers: {
        Authorization: `token ${this.authToken}`
      },
      body: JSON.stringify({
        base: to,
        head: from,
        commit_message: `Merge ${from} into ${to}` // eslint-disable-line @typescript-eslint/camelcase
      })
    });

    if (response.status !== 201) {
      const message = await response.text();
      throw new MergeError(message);
    }
  }
}
