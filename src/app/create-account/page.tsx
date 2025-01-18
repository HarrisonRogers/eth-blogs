'use client';

import { useAccount } from 'wagmi';
import CreateAccountForm from './createAccountForm';

export default function CreateAccountPage() {
  const { address, isConnected } = useAccount();

  if (!isConnected || !address) {
    return (
      <div className="text-2xl">
        Please connect to your wallet to create an account
      </div>
    );
  }

  return (
    <div className="w-1/2">
      <h1 className="text-3xl text-center font-bold mb-8">
        Create Your Account to Start Blogging
      </h1>
      <CreateAccountForm />
    </div>
  );
}
