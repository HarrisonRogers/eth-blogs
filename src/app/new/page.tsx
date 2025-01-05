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

const formSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  author: z.string().min(1),
  date: z.date(),
});

type FormSchema = z.infer<typeof formSchema>;

function NewBlogPage() {
  const [success, setSuccess] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const handleCreateBlog = async (data: FormSchema) => {
    try {
      setLoading(true);
      console.log(data);
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Create a new blog</h1>
      <form
        onSubmit={handleSubmit(handleCreateBlog)}
        className="flex flex-col gap-4 w-full"
      >
        <div>
          <Label htmlFor="title">Title</Label>
          <Input placeholder="Title" {...register('title')} />
        </div>
        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea placeholder="Content" {...register('content')} />
        </div>
        <div>
          <Label htmlFor="author">Author</Label>
          <Input placeholder="Author" {...register('author')} />
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
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button type="submit" className="active:scale-95 transition-all">
          Create
        </Button>
        {success && <p>Blog created successfully</p>}
        {error && <p>{error}</p>}
        {loading && <p>Loading...</p>}
      </form>
    </div>
  );
}

export default NewBlogPage;
