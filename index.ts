import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import key from './wallet.json';
import Arweave from 'arweave';
import fetch from 'node-fetch';
import core from '@actions/core';
import github from '@actions/github';

const arweave = Arweave.init({
  host: 'arweave.net', // Hostname or IP address for a Arweave host
  port: 443, // Port
  protocol: 'https', // Network protocol http or https
  timeout: 20000, // Network request timeouts in milliseconds
  logging: false, // Enable network request logging});
});

const zipDirectory = (sourceDir: string, outPath: string) => {
  const archive = archiver('zip', { zlib: { level: 9 } });
  const stream = fs.createWriteStream(outPath);

  return new Promise((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on('error', (err: Error) => reject(err))
      .pipe(stream);

    stream.on('close', () => resolve(true));
    archive.finalize();
  });
};

const getLoadedArweaveWalletBalance = async () => {
  const address = await arweave.wallets.jwkToAddress(key);
  const balance = await arweave.wallets.getBalance(address);
  console.log(`Arweave wallet balance: ${balance}`);
  console.log(
    `Arweave wallet balance in AR: ${arweave.ar.winstonToAr(balance)}`
  );
};

const main = async () => {
  // Download the contents of the Github repo at https://github.com/dhaiwat10/create-web3-frontend to a folder called 'repo' using the Github API
  const repo = await fetch(
    'https://api.github.com/repos/dhaiwat10/create-web3-frontend/zipball'
  );

  github.context.repo.owner;

  const repoBuffer = await repo.buffer();
  fs.writeFileSync('repo.zip', repoBuffer);

  // // convert the zip to base64 blob
  const base64string = fs.readFileSync(path.resolve('./repo.zip'), {
    encoding: 'base64',
  });

  // convert the base64 string to a blob
  const blob = Buffer.from(base64string, 'base64');
  console.log(`repo.zip is ${blob.length / 1000000.0} MB`);

  // create an arweave transaction with the base64 blob
  const transaction = await arweave.createTransaction(
    {
      data: blob,
    },
    key
  );

  transaction.addTag('Content-Type', 'application/zip');
  transaction.addTag('App-Name', 'arweave-repo-backup');

  // sign the transaction with the wallet
  await arweave.transactions.sign(transaction, key);

  // send the transaction to the network
  const res = await arweave.transactions.post(transaction);
  console.log(res);

  const txId = transaction.id;
  console.log('TX ID:', txId);
};

// main();

const testFn = async () => {
  console.log({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
  });
};
