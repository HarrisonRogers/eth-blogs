import Web3 from 'web3';
import pkg from 'fs-extra';
const { readFileSync } = pkg;
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env for sensitive information
import dotenv from 'dotenv';
dotenv.config();

// Configure your provider and wallet
const providerUrl = process.env.INFURA_ENDPOINT;
const privateKey = process.env.PRIVATE_KEY;
if (!providerUrl || !privateKey) {
  throw new Error(
    'Please set INFURA_ENDPOINT and PRIVATE_KEY in your .env file.'
  );
}

// Initialize web3 instance
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

// Create account from private key
const account = web3.eth.accounts.privateKeyToAccount(`0x${privateKey}`);
web3.eth.accounts.wallet.add(account);

(async () => {
  try {
    // Define paths for compiled contract
    const buildPath = path.resolve(__dirname, 'build');
    const contractName = 'BlogSubscriptions';
    const contractPath = path.resolve(buildPath, `${contractName}.json`);

    // Read and parse compiled contract
    const compiledContract = JSON.parse(readFileSync(contractPath, 'utf8'));
    const { abi, evm } = compiledContract;

    // Create contract instance
    const contract = new web3.eth.Contract(abi);

    // Deploy contract
    const deployTx = contract.deploy({
      data: evm.bytecode.object, // Bytecode from the compilation output
      arguments: [], // Add constructor arguments if needed
    });

    console.log('Estimating gas for deployment...');
    const gasEstimate = await deployTx.estimateGas({ from: account.address });

    console.log('Sending deployment transaction...');
    const deployedContract = await deployTx.send({
      from: account.address,
      gas: gasEstimate,
    });

    console.log('Contract successfully deployed!');
    console.log('Contract Address:', deployedContract.options.address);
  } catch (error) {
    console.error('Error during deployment:', error);
  }
})();
