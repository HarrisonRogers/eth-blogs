'use client';

import {
  createWalletClient,
  custom,
  parseEther,
  formatEther,
  WalletClient,
} from 'viem';
import { sepolia } from 'viem/chains';
import { useState, useEffect } from 'react';

export default function Home() {
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [client, setClient] = useState<WalletClient | null>(null);

  const connectWallet = async () => {
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        throw new Error(
          'MetaMask is not installed. Please install MetaMask to continue.'
        );
      }

      // Create wallet client
      const walletClient = createWalletClient({
        chain: sepolia,
        transport: custom(window.ethereum),
      });

      setClient(walletClient);

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // Get the connected address
      const [userAddress] = accounts;
      setAddress(userAddress);

      // Get account balance
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [userAddress, 'latest'],
      });

      setBalance(formatEther(BigInt(balance)));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    }
  };

  // Example function to send ETH
  const sendTransaction = async () => {
    try {
      if (!client || !address) return;

      const hash = await client.sendTransaction({
        to: '0x1f5729Cd691C5f529AFf5d74bf4C34Ed61822b87', // Replace with recipient address
        value: parseEther('0.1'), // Sending 0.1 ETH
        account: address as `0x${string}`,
        chain: sepolia,
      });

      console.log('Transaction hash:', hash);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to send transaction'
      );
    }
  };

  // Example function to sign a message
  const signMessage = async () => {
    try {
      if (!client || !address) return;

      const signature = await client.signMessage({
        account: address as `0x${string}`,
        message: 'Hello, Web3!',
      });

      console.log('Signature:', signature);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign message');
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-4xl font-oswald mb-4">Hello World</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {address ? (
        <div className="space-y-4">
          <div className="text-green-500">Connected: {address}</div>
          <div className="text-blue-500">Balance: {balance} ETH</div>

          <div className="space-x-4">
            <button
              onClick={sendTransaction}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              Send 0.1 ETH
            </button>

            <button
              onClick={signMessage}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign Message
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
