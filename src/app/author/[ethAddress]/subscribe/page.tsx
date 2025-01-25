'use client';

import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from 'wagmi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import BlogSubscriptionsAbi from '@/utils/blogSubscriptionsAbi';
import { formatEther } from 'viem';
import { useAuthor } from '@/hooks/useAuthor';
import { revalidatePath } from 'next/cache';

type PageProps = {
  params: {
    ethAddress: string;
  };
};

function SubscribePage({ params }: PageProps) {
  const { address } = useAccount();
  const router = useRouter();
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [error, setError] = useState('');
  const { data: author } = useAuthor(params.ethAddress);

  const { data: subscriptionFee } = useReadContract({
    address: process.env
      .NEXT_PUBLIC_SUBSCRIPTION_CONTRACT_ADDRESS as `0x${string}`,
    abi: BlogSubscriptionsAbi,
    functionName: 'getSubscriptionFee',
    args: [params.ethAddress],
  });

  const {
    data: hash,
    writeContract,
    isPending,
    error: contractError,
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isConfirmed) {
      router.push(`/author/${params.ethAddress}`);
    }
  }, [isConfirmed, router, params.ethAddress]);

  useEffect(() => {
    if (contractError) {
      setIsSubscribing(false);
    }
  }, [contractError]);

  if (!author?.data) {
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Invalid Author Address</h1>
        <p>The author address you are trying to subscribe to is invalid.</p>
      </div>
    );
  }

  const handleSubscribe = async () => {
    if (!address) {
      setError('Please connect your wallet.');
      return;
    }

    setIsSubscribing(true);
    setError('');

    try {
      await writeContract({
        address: process.env
          .NEXT_PUBLIC_SUBSCRIPTION_CONTRACT_ADDRESS as `0x${string}`,
        abi: BlogSubscriptionsAbi,
        functionName: 'subscribeToAuthor',
        args: [params.ethAddress],
        value: BigInt(subscriptionFee as bigint),
      });
      revalidatePath(`/author/${params.ethAddress}`);
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
      setIsSubscribing(false);
      console.log(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">
        Subscribe to {author?.data?.name}
      </h1>
      <p>Subscribe to {author?.data?.name} to view all their blog posts.</p>
      <small className="text-sm opacity-50 mb-4">
        <span className="font-bold">Eth Address:</span>{' '}
        {author?.data?.eth_address}
      </small>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Button
        onClick={handleSubscribe}
        disabled={isPending || isConfirming || isSubscribing}
      >
        {isPending || isConfirming
          ? 'Subscribing...'
          : `Subscribe for ${formatEther(
              (subscriptionFee as bigint) || BigInt(0)
            )} ETH`}
      </Button>
      {contractError && (
        <p className="text-red-500 mt-4">{contractError.message}</p>
      )}
    </div>
  );
}

export default SubscribePage;
