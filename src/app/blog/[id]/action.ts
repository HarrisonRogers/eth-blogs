'use server';

import { createClient } from '@/utils/supabase/client';

export async function getBlogPost(id: string) {
  const supabase = createClient();

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
