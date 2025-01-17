import React from 'react';
import { Card, CardContent, CardTitle } from './ui/card';
import { Database } from '../../database.types';
import TruncatedContent from '@/components/utils/TruncatedContent';
import { monthDayYear, truncateAddress } from '@/utils/dataFormat';
import Link from 'next/link';

type BlogPostProps = {
  blogs: Database['public']['Tables']['blog_posts']['Row'][];
};

export default async function BlogPosts({ blogs }: BlogPostProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* TODO: Fix hydration error */}
      {blogs.map((blog) => (
        <Card
          key={blog.id}
          className="hover:scale-105 transition-all duration-300"
        >
          <Link href={`/blog/${blog.id}`}>
            <CardTitle className="p-5">{blog.title}</CardTitle>

            <CardContent>
              <small className="text-gray-500">
                {monthDayYear(blog.created_at || '')}
              </small>
              <TruncatedContent
                content={blog.content}
                href={`/blog/${blog.id}`}
              />
              <p>
                <strong>Author:</strong>{' '}
                {truncateAddress(blog.eth_address || '')}
              </p>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}
