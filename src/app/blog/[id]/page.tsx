import React from 'react';
import { getBlogPost } from './action';
import NotFound from '@/components/utils/NotFound';
import { Separator } from '@/components/ui/separator';
import { monthDayYear } from '@/utils/dataFormat';
import DeleteButton from './deleteButton';

async function page({ params }: { params: { id: string } }) {
  const { success, data: blog } = await getBlogPost(params.id);

  if (!success || !blog) {
    return <NotFound />;
  }

  return (
    <>
      <div className="text-center">
        <h1 className="text-5xl max-w-screen-lg whitespace-pre-wrap">
          {blog.title}
        </h1>
      </div>
      <Separator className="mt-8 mb-5" />
      <p className="text-foreground italic font-semibold">
        Author: {blog.eth_address}
      </p>
      <p className="mt-4 text-foreground italic font-semibold">
        Published: {monthDayYear(blog.created_at!)}
      </p>
      {blog.updated_at !== blog.created_at && (
        <p className="mt-4 text-foreground italic font-semibold">
          Last Updated: {monthDayYear(blog.updated_at!)}
        </p>
      )}
      <Separator className="my-5" />
      <p>{blog.content}</p>

      <DeleteButton id={blog.id} authorAddress={blog.eth_address!} />
    </>
  );
}

export default page;
