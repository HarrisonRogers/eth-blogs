import React from 'react';
import { createClient } from '@/utils/supabase/client';

export default async function BlogPosts() {
  const supabase = createClient();
  const { data: blogs, error } = await supabase.from('blog_posts').select('*');

  if (error) {
    console.error('Error fetching blogs:', error);
    return <div>Error fetching blogs</div>;
  }

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          <p>
            <strong>Author:</strong> {blog.eth_address}
          </p>
        </div>
      ))}
    </div>
  );
}
