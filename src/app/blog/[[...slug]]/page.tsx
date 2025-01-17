import React from 'react';
import { getAuthor } from '@/actions/getAuthor';
import { getBlogPost } from '@/actions/getBlogPost';
import NotFound from '@/components/utils/NotFound';
import { Separator } from '@/components/ui/separator';
import { monthDayYear } from '@/utils/dataFormat';
import DeleteButton from './deleteButton';
import Link from 'next/link';

type Params = {
  params: {
    slug: string[];
  };
};

async function page({ params }: Params) {
  const { success, data: blog } = await getBlogPost(params.slug[1]);
  const { data: author } = await getAuthor(params.slug[0]);

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
      <div className="text-center gap-3 flex flex-col">
        <p>
          <span className="font-semibold">Author:</span> {author?.name}
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

export default page;
