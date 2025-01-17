'use server';

import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export async function getBlogPost(id: string) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', Number(id))
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return { success: false, error: 'Failed to fetch blog post' };
  }
}
