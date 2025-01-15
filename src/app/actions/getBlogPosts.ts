'use server';

import { supabaseServerClient } from '../../lib/supabaseServerClient';

export async function getBlogPosts() {
  // Fetch blog posts with their authors
  const { data, error } = await supabaseServerClient
    .from('blog_posts')
    .select(
      `
      id,
      title,
      content,
      created_at,
      authors (
        name,
        eth_address
      )
    `
    )
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    throw new Error('Failed to fetch blog posts');
  }

  return data;
}
