'use client';

import { useAccount } from 'wagmi';
import { BlogPosts } from '@/components/BlogPosts';
import Link from '@/components/ui/link';

export default function Home() {
  const { isConnecting } = useAccount();

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-8">Ethereum Blogs</h1>

      {isConnecting ? <div>Connecting...</div> : <BlogPosts />}
      <Link href="/new" className="mt-10">
        New Blog
      </Link>
    </div>
  );
}
