'use server';

import { createClient } from '@/utils/supabase/client';
import { revalidatePath } from 'next/cache';

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

export async function getAuthor(ethAddress: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('authors')
    .select('*')
    .eq('eth_address', ethAddress)
    .single();

  if (error) console.error(error);

  return { success: true, data };
}

export async function deleteBlogPost(id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', Number(id));

  if (error) throw error;

  revalidatePath('/');
  revalidatePath(`/blog/${id}`);

  return { success: true };
}
