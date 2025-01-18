import React from 'react';
import { Database } from '../../database.types';

import PostCard from './postCard';

type BlogPostProps = {
  blogs: Database['public']['Tables']['blog_posts']['Row'][];
};

export default function BlogPosts({ blogs }: BlogPostProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {blogs.map((blog) => (
        <PostCard post={blog} key={blog.id} />
      ))}
    </div>
  );
}
