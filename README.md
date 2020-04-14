# git-ops
Git operations on various git vendors.

## Merge branch
Merge a branch into another.
- Using GitHub API
    ```javascript 1.8
    import { GitOpsFactory } from './GitOperations';
  
    const gitOps = GitOpsFactory.getGitHubImpl('1234', 'rajeevnaikte/git-ops');
    
    gitOps.merge('master', 'feature1');
    gitOps.merge('master', 'feature2');
    ```
