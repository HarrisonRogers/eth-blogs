'use client';

import { Card } from './ui/card';
import { BLOG_POST_FACTORY_ABI } from '@/constants/constants';
import { useReadContract } from 'wagmi';
import { useState } from 'react';

export function BlogPosts() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const {
    data: posts,
    isLoading,
    isError,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS as `0x${string}`,
    abi: BLOG_POST_FACTORY_ABI,
    functionName: 'getDeployedBlogPosts',
  });

  if (posts) {
    setBlogPosts(posts as BlogPost[]);
  }

  if (isLoading) return <div>Loading blog posts...</div>;
  if (isError) return <div>Error loading blog posts</div>;

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {blogPosts.map((post: BlogPost) => (
        <BlogPostCard key={post.author} post={post} />
      ))}
    </div>
  );
}

type BlogPostCardProps = {
  post: BlogPost;
};

function BlogPostCard({ post }: BlogPostCardProps) {
  if (!post) return null;

  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-sm text-gray-500">{post.date.toLocaleDateString()}</p>
      <p className="mt-2">{post.content}</p>
      <p className="mt-2 text-sm">Author: {post.author}</p>
    </Card>
  );
}
