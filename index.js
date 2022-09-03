const core = require('@actions/core');
const github = require('@actions/github');

const testFn = async () => {
  core.setSecret('arweaveWalletKey');
  console.log({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
  });
};

testFn();
