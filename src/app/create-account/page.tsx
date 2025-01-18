'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import CreateAccountForm from './createAccountForm';

export default function CreateAccountPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected || !address) {
      router.push('/');
    }
  }, [isConnected, address, router]);

  if (!isConnected || !address) {
    return <div>Please connect your wallet</div>;
  }

  return (
    <div className="w-1/2">
      <h1 className="text-3xl text-center font-bold mb-8">
        Create Your Account
      </h1>
      <CreateAccountForm />
    </div>
  );
}
