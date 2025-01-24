'use client';

import React from 'react';
import { Tables } from '../../../../database.types';
import { monthDayYear } from '@/utils/dataFormat';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import DeleteButton from './deleteButton';
import { motion, useScroll } from 'motion/react';

type BlogContentProps = {
  blog: Tables<'blog_posts'>;
  authorName: string;
};

function BlogContent({ blog, authorName }: BlogContentProps) {
  const { scrollYProgress } = useScroll();
  return (
    <>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          originX: 0,
        }}
        className="fixed top-0 left-0 right-0 z-50 h-[10px] bg-primary"
      />
      <div className="text-center">
        <h1 className="text-5xl max-w-screen-lg whitespace-pre-wrap">
          {blog.title}
        </h1>
      </div>
      <Separator className="mt-8 mb-5" />
      <div className="text-center gap-3 flex flex-col">
        <p>
          <span className="font-semibold">Author:</span> {authorName}
        </p>
        <Link
          href={`/author/${blog.eth_address}`}
          className="underline underline-offset-2 hover:no-underline"
        >
          <span className="font-semibold">Address:</span> {blog.eth_address}
        </Link>
        <p className=" text-foreground italic">
          <span className="font-semibold">Published:</span>{' '}
          {monthDayYear(blog.created_at!)}
        </p>
        {blog.updated_at !== blog.created_at && (
          <p className=" text-foreground italic">
            <span className="font-semibold">Last Updated:</span>{' '}
            {monthDayYear(blog.updated_at!)}
          </p>
        )}
      </div>
      <Separator className="my-5" />
      <p>{blog.content}</p>

      <DeleteButton id={blog.id} authorAddress={blog.eth_address!} />
    </>
  );
}

export default BlogContent;
