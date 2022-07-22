'use strict';

/* 
  Simplified Bitcoin mining example in JS
  Based on the Einundzwanzig Podcast Phyton example 
  https://www.youtube.com/watch?v=8X9P63SBa0I&t=113s

  Run it on Stackblitz:
  https://stackblitz.com/edit/node-ykmt3z?file=index.js

  Run: node index.js in the console
*/

import { createHash } from 'crypto';

// Set a limit to find a block
const maxNonce = 200000;

// SHA256 hash function
const hashFunction = (string) => {
  return createHash('sha256').update(string).digest('hex');
};

// Mining function
const miningFn = (blckNr, tx, prevHash, diff) => {
  // Set the difficulty
  const currentDiff = (0).toString().padStart(diff, '0');

  // Itterate over the maxNonce
  for (let nonce = 0; nonce < maxNonce; nonce++) {
    // Hash the last Transactions and create new block
    const hashInput = blckNr + tx + prevHash + nonce;
    let newHash = hashFunction(hashInput);

    console.log(`Current hash: ${newHash}`);

    // Return the function if a block is found
    if (newHash.startsWith(currentDiff)) {
      console.log(`You found a valid block with the nonce: ${nonce}`);
      return newHash;
    }
  }
};

const runMiner = () => {
  const txMsg = 'Rosi sends 10 BTC to Dora';

  const diff = 3; // Difficult set to three null "000"
  const currentBlk = 723239; // Set current block

  console.log('Start mining!');

  // Start timetracking
  console.time('Duration');

  // Hash the new Block
  let newHash = miningFn(
    currentBlk,
    txMsg,
    '0000000000000000300000000000000000002cedb3a63470cf14abd02f5065a3cd0743170490795408272472874875',
    diff
  );

  newHash
    ? console.log(`New hash: ${newHash}`)
    : console.log('No block was found in the given time!');

  console.timeEnd('Duration');
};

// Run miner
runMiner();
