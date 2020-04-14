import { GitHub } from './impl/GitHub';

/**
 * All operations for Git repo.
 */
export interface GitOperations {
  /**
   * Merge 'from' branch into 'to' branch.
   * @param from
   * @param to
   */
  merge (from: string, to: string): Promise<void>;
}

export class GitOpsFactory {
  static getGitHubImpl (token: string, repo: string): GitOperations {
    return new GitHub(token, repo);
  }
}
