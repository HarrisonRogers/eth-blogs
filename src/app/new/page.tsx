'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  type BaseError,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { BLOG_POST_FACTORY_ABI } from '@/constants/constants';

const formSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  author: z.string().min(1),
  date: z.date(),
});

type FormSchema = z.infer<typeof formSchema>;

function NewBlogPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      setValue('date', newDate);
    }
  };

  const handleCreateBlog = async (data: FormSchema) => {
    try {
      writeContract({
        address: process.env
          .NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS as `0x${string}`,
        abi: BLOG_POST_FACTORY_ABI,
        functionName: 'createBlogPost',
        args: [data.title, data.content, data.author, data.date],
      });
      console.log(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      console.error(errorMessage);
    }
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
        <div>
          <Label htmlFor="author">Author</Label>
          <Input placeholder="Author" {...register('author')} />
          {errors.author && <p>{errors.author.message}</p>}
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : format(new Date(), 'PPP')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.date && (
            <p className="text-sm text-red-500 mt-1">{errors.date.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="active:scale-95 transition-all"
          disabled={isPending}
        >
          {isPending ? 'Creating...' : 'Create'}
        </Button>
        {hash && <p>Transaction Hash: {hash}</p>}
        {isSuccess && (
          <p className="text-sm text-green-600 bg-green-50 p-3 rounded-md">
            Blog created successfully! ✨
          </p>
        )}
        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
            Error: {(error as BaseError).shortMessage || error.message}
          </p>
        )}
        {isLoading && (
          <p className="text-sm text-blue-600 bg-blue-50 p-3 rounded-md">
            Creating your blog post...
          </p>
        )}
      </form>
    </div>
  );
}

export default NewBlogPage;
