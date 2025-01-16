import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Database } from '../../database.types';
import TruncatedContent from '@/components/utils/TruncatedContent';
import { monthDayYear, truncateAddress } from '@/utils/dataFormat';

type BlogPostProps = {
  blogs: Database['public']['Tables']['blog_posts']['Row'][];
};

export default async function BlogPosts({ blogs }: BlogPostProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {blogs.map((blog) => (
        <Card key={blog.id}>
          <CardHeader>
            <CardTitle>{blog.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <small className="text-gray-500">
              {monthDayYear(blog.created_at || '')}
            </small>
            <TruncatedContent
              content={blog.content}
              href={`/blog/${blog.id}`}
            />
            <p>
              <strong>Author:</strong> {truncateAddress(blog.eth_address || '')}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
