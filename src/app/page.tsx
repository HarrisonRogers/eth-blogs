'use client';

import { useAccount } from 'wagmi';
import { BlogPosts } from '@/components/BlogPosts';
import Container from '@/components/ui/container';
import Link from '@/components/ui/link';

export default function Home() {
  const { isConnecting } = useAccount();

  return (
    <Container className="py-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">Ethereum Blogs</h1>

      {isConnecting ? <div>Connecting...</div> : <BlogPosts />}
      <Link href="/new" className="mt-10">
        New Blog
      </Link>
    </Container>
  );
}
