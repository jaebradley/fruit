import Octokit from '@octokit/rest';

const client = new Octokit();

const isGitHubUsernameValid = async (username) => {
  try {
    await client.users.getForUser({ username });
    return true;
  } catch (e) {
    return false;
  }
};

export default isGitHubUsernameValid;
