'use client';

import { useState, useTransition } from 'react';
import { useAccount } from 'wagmi';
import { createBlogPost } from '../actions/createBlogPost';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { blogPostSchema } from '@/schemas/blogPost';
import * as z from 'zod';

type FormSchema = z.infer<typeof blogPostSchema>;

export default function BlogPostForm() {
  const { address } = useAccount();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(blogPostSchema),
  });

  const handleCreateBlog = async (data: FormSchema) => {
    if (!address) {
      setError('Please connect your wallet.');
      return;
    }

    const formData = new FormData();
    formData.set('title', data.title);
    formData.set('content', data.content);
    formData.set('userEthAddress', address);

    startTransition(async () => {
      try {
        await createBlogPost(formData);
        alert('Blog post created successfully!');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to create post.');
      }
    });
  };

  return (
    <div className="w-1/2">
      <h1 className="text-3xl text-center font-bold mb-8">Create a new blog</h1>
      <form
        onSubmit={handleSubmit(handleCreateBlog)}
        className="flex flex-col gap-4 w-full"
      >
        <div>
          <Label htmlFor="title">Title</Label>
          <Input placeholder="Title" {...register('title')} />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea placeholder="Content" {...register('content')} />
          {errors.content && <p>{errors.content.message}</p>}
        </div>
        <Button
          type="submit"
          className="active:scale-95 transition-all"
          disabled={isPending}
        >
          {isPending ? 'Creating...' : 'Create'}
        </Button>

        {isPending && (
          <p className="text-sm text-blue-600 bg-blue-50 p-3 rounded-md">
            Creating your blog post...
          </p>
        )}
        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
            Error: {error}
          </p>
        )}
      </form>
    </div>
  );
}
