import React from 'react';
import { Database } from '../../database.types';
import { monthDayYear, truncateAddress } from '@/utils/dataFormat';
import Link from 'next/link';
import { Card, CardTitle, CardContent } from './ui/card';
import TruncatedContent from './utils/TruncatedContent';

type PostCardProps = {
  post: Database['public']['Tables']['blog_posts']['Row'];
};

function PostCard({ post }: PostCardProps) {
  return (
    <Card
      key={post.id}
      className="hover:scale-105 transition-all duration-300 h-full"
    >
      <Link href={`/blog/${post.eth_address}/${post.id}`} className="h-full">
        <CardTitle className="p-5">{post.title}</CardTitle>

        <CardContent>
          <small className="text-gray-500">
            {monthDayYear(post.created_at || '')}
          </small>
          <TruncatedContent
            content={post.content}
            href={`/blog/${post.eth_address}/${post.id}`}
          />
          <p>
            <strong>Author:</strong> {truncateAddress(post.eth_address || '')}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}

export default PostCard;
