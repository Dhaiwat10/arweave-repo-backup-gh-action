const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const Arweave = require('arweave');
const archiver = require('archiver');

const arweave = Arweave.init({
  host: 'arweave.net', // Hostname or IP address for a Arweave host
  port: 443, // Port
  protocol: 'https', // Network protocol http or https
  timeout: 20000, // Network request timeouts in milliseconds
  logging: false, // Enable network request logging});
});

// const main = async () => {
//   const repoOwner = github.context.repo.owner;
//   const repoName = github.context.repo.repo;

//   const repo = await fetch(
//     `https://api.github.com/repos/${repoOwner}/${repoName}/zipball`
//   );

//   const repoBuffer = await repo.buffer();
//   fs.writeFileSync('repo.zip', repoBuffer);

//   // // // convert the zip to base64 blob
//   // const base64string = fs.readFileSync(path.resolve('./repo.zip'), {
//   //   encoding: 'base64',
//   // });

//   // // convert the base64 string to a blob
//   // const blob = Buffer.from(base64string, 'base64');
//   // console.log(`repo.zip is ${blob.length / 1000000.0} MB`);

//   // // create an arweave transaction with the base64 blob
//   // const transaction = await arweave.createTransaction(
//   //   {
//   //     data: blob,
//   //   },
//   //   key
//   // );

//   // transaction.addTag('Content-Type', 'application/zip');
//   // transaction.addTag('App-Name', 'arweave-repo-backup');

//   // // sign the transaction with the wallet
//   // await arweave.transactions.sign(transaction, key);

//   // // send the transaction to the network
//   // const res = await arweave.transactions.post(transaction);
//   // console.log(res);

//   // const txId = transaction.id;
//   // console.log('TX ID:', txId);
// };

const testFn = async () => {
  core.setSecret(core.getInput('arweaveWalletKey'));
  console.log({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
  });
};

testFn();
