import { getAuthor } from '@/actions/getAuthor';
import { getBlogPostByAuthor } from '@/actions/getPostByAuthor';
import React from 'react';

type PageProps = {
  params: {
    ethAddress: string;
  };
};

async function page({ params }: PageProps) {
  const { data: author } = await getAuthor(params.ethAddress);
  const { data: posts } = await getBlogPostByAuthor(params.ethAddress);
  return (
    <div>
      <h1>{author?.name}</h1>
      {posts?.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default page;
