'use client';

import { Card } from './ui/card';
import { BLOG_POST_FACTORY_ABI } from '@/constants/constants';
import { type BaseError, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export function BlogPosts() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const {
    data: posts,
    isLoading,
    error,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS as `0x${string}`,
    abi: BLOG_POST_FACTORY_ABI,
    functionName: 'getDeployedBlogPosts',
  });

  useEffect(() => {
    if (posts) {
      setBlogPosts(posts as BlogPost[]);
    }
  }, [posts]);

  if (isLoading) return <div>Loading blog posts...</div>;
  if (error)
    return (
      <div>
        Error: {(error as unknown as BaseError).shortMessage || error.message}
      </div>
    );

  if (blogPosts.length === 0) return <div>No blog posts found</div>;

  console.log(blogPosts[0]);

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
  key: string;
};

function BlogPostCard({ post, key }: BlogPostCardProps) {
  if (!post) return null;

  return (
    <Card className="p-4" key={key}>
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-sm text-gray-500">{post.date}</p>
      <p className="mt-2">{post.content}</p>
      <p className="mt-2 text-sm">Author: {post.author}</p>
    </Card>
  );
}
