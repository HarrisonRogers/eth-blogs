'use client';

import { useAccount } from 'wagmi';
import { BlogPosts } from '@/components/BlogPosts';
import Container from '@/components/ui/container';

export default function Home() {
  const { isConnecting } = useAccount();

  return (
    <Container className="py-8">
      <h1 className="text-3xl font-bold mb-8">Ethereum Blogs</h1>

      {isConnecting ? <div>Connecting...</div> : <BlogPosts />}
    </Container>
  );
}
