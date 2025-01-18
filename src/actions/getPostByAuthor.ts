'use server';

import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export async function getBlogPostByAuthor(ethAddress: string) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('eth_address', ethAddress);

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return { success: false, error: 'Failed to fetch blog post' };
  }
}
