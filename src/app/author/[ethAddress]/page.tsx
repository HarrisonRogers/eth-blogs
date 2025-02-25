'use client';

import PostCard from '@/components/postCard';
import { useAuthor } from '@/hooks/useAuthor';
import { useBlogPostByAuthor } from '@/hooks/useBlogPostByAuthor';
import { monthDayYear } from '@/utils/dataFormat';
import Link from 'next/link';
import React from 'react';
import { useAccount, useReadContract } from 'wagmi';
import BlogSubscriptionsAbi from '@/utils/blogSubscriptionsAbi';
import { formatEther } from 'viem';
import { Button } from '@/components/ui/button';
import NotFound from '@/components/utils/NotFound';
import Loader from '@/components/ui/loader';

type PageProps = {
  params: {
    ethAddress: string;
  };
};

function Page({ params }: PageProps) {
  const { address } = useAccount();
  const { data: author, isLoading: authorLoading } = useAuthor(
    params.ethAddress
  );

  const isAuthor = author?.data?.eth_address === address;

  const { data: isSubscribed, isLoading: subscriptionLoading } =
    useReadContract({
      address: process.env
        .NEXT_PUBLIC_SUBSCRIPTION_CONTRACT_ADDRESS as `0x${string}`,
      abi: BlogSubscriptionsAbi,
      functionName: 'subscribed',
      args: [author?.data?.eth_address, address],
    });

  const { data: posts, isLoading: postsLoading } = useBlogPostByAuthor(
    params.ethAddress,
    isAuthor || !!isSubscribed
  );

  const { data: subscriptionFee, isLoading: feeLoading } = useReadContract({
    address: process.env
      .NEXT_PUBLIC_SUBSCRIPTION_CONTRACT_ADDRESS as `0x${string}`,
    abi: BlogSubscriptionsAbi,
    functionName: 'getSubscriptionFee',
    args: [author?.data?.eth_address],
  });

  if (authorLoading || subscriptionLoading || postsLoading || feeLoading) {
    return <Loader />;
  }

  if (!author?.data) {
    return <NotFound />;
  }

  return (
    <div>
      <div>
        <h1 className="text-center font-oswald text-5xl font-bold">
          {author?.data?.name}
        </h1>
        <p className="text-center mt-4 text-sm opacity-50">
          <span className="font-bold">Author address:</span>{' '}
          {author?.data?.eth_address}
        </p>
        <p className="text-center text-sm opacity-50">
          <span className="font-bold">Account Created:</span>{' '}
          {monthDayYear(author?.data?.created_at || '')}
        </p>
        <p className="text-center text-sm opacity-50">
          <span className="font-bold">Subscription Fee:</span>{' '}
          {subscriptionFee
            ? `${formatEther((subscriptionFee as bigint) || BigInt(0))} ETH`
            : 'Not set'}
        </p>
        {author?.data?.eth_address === address && (
          <div className="flex justify-center mt-4">
            <Link
              href={`/author/${author?.data?.eth_address}/${author?.data?.id}`}
              className="text-sm border border-primary rounded-md p-2"
            >
              Edit account
            </Link>
          </div>
        )}
      </div>
      <div className="mt-20">
        {posts?.data?.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}

        {!isSubscribed &&
          !isAuthor &&
          posts?.data &&
          posts.data.length >= 2 && (
            <div className="mt-8 p-4 border border-primary rounded-md text-center">
              <p className="mb-4">
                Subscribe to see all posts from this author!
              </p>
              <Link href={`/author/${author?.data?.eth_address}/subscribe`}>
                <Button variant="outline">Subscribe</Button>
              </Link>
            </div>
          )}
      </div>
    </div>
  );
}

export default Page;
