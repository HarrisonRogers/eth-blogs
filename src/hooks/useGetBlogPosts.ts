import { useReadContract } from 'wagmi';
import BlogPostFactory from '../../eth/build/BlogPostFactory.json';
import { type Address } from 'viem';

export function useGetBlogPosts() {
  // First get all deployed blog post addresses
  const { data: deployedPosts, isLoading: isLoadingAddresses } =
    useReadContract({
      address: process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS as Address,
      abi: BlogPostFactory.abi,
      functionName: 'getDeployedBlogPosts',
    });

  // Then get the content for each blog post
  const {
    isLoading: isLoadingPosts,
    isError,
    error,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS as Address,
    abi: BlogPostFactory.abi,
    functionName: 'deployedBlogPosts',
    args: [0],
  });

  return {
    posts: deployedPosts as Address[] | undefined,
    isLoading: isLoadingAddresses || isLoadingPosts,
    isError,
    error,
  };
}
