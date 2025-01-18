import { getAuthor } from '@/actions/getAuthor';
import { getBlogPostByAuthor } from '@/actions/getPostByAuthor';
import PostCard from '@/components/postCard';
import { monthDayYear } from '@/utils/dataFormat';
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
      <div>
        <h1 className="text-center font-oswald text-5xl font-bold">
          {author?.name}
        </h1>
        <p className="text-center mt-4 text-sm opacity-50">
          <span className="font-bold">Author address:</span>{' '}
          {author?.eth_address}
        </p>
        <p className="text-center text-sm opacity-50">
          <span className="font-bold">Account Created:</span>{' '}
          {monthDayYear(author?.created_at || '')}
        </p>
      </div>
      <div className="mt-20">
        {posts?.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}

export default page;
