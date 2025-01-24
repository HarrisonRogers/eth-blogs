import React from 'react';
import { getAuthor } from '@/actions/getAuthor';
import { getBlogPost } from '@/actions/getBlogPost';
import NotFound from '@/components/utils/NotFound';
import BlogContent from './blogContent';

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
    <BlogContent blog={blog} authorName={author?.name ?? 'Ghost Writer'} />
  );
}

export default page;
