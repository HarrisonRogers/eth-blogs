import { useReadContract } from 'wagmi';
import BlogPost from '../../eth/build/BlogPost.json';
import { type Address } from 'viem';
import { type BlogPostResponse } from '../types/contracts';

export function useGetBlogPostContent(postAddress: Address) {
  return useReadContract({
    address: postAddress,
    abi: BlogPost.abi,
    functionName: 'getBlogPostContent',
  }) as { data: BlogPostResponse | undefined };
}
