'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { blogPostSchema } from '@/schemas/blogPost';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createBlogPost } from './action';

type FormSchema = z.infer<typeof blogPostSchema>;

function BlogPostForm() {
  const { address } = useAccount();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(blogPostSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    if (!address) {
      console.error('No connected wallet address found.');
      setError('Please connect your wallet.');
      return;
    }

    const formData = new FormData();
    formData.set('title', data.title);
    formData.set('content', data.content);
    formData.set('userEthAddress', address);

    try {
      setIsPending(true);
      await createBlogPost({
        ...data,
        eth_address: address,
      });
      router.push('/');
      setIsPending(false);
    } catch (err) {
      console.error('Error creating post:', err);
      setError(err instanceof Error ? err.message : 'Failed to create post.');
      setIsPending(false);
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Title"
          {...register('title')}
          className={errors.title ? 'border-red-500' : ''}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="Content"
          {...register('content')}
          className={errors.content ? 'border-red-500' : ''}
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
        )}
      </div>
      <Button
        type="submit"
        className="active:scale-95 transition-all"
        disabled={isPending}
      >
        {isPending ? 'Creating...' : 'Create'}
      </Button>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
          Error: {error}
        </p>
      )}
    </form>
  );
}

export default BlogPostForm;
