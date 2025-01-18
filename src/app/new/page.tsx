'use client';

import BlogPostForm from './blogPostForm';
import { useAccount } from 'wagmi';
import { useAuthor } from '@/hooks/useAuthor';
import { useRouter } from 'next/navigation';

export default function NewPostPage() {
  const { address } = useAccount();
  const { data: author } = useAuthor(address);
  const router = useRouter();

  if (!author?.data) {
    router.push('/create-account');
  }

  return <BlogPostForm />;
}
