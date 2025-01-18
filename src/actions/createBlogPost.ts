'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export type BlogFormData = {
  title: string;
  content: string;
  eth_address: string;
};

export async function createBlogPost(data: BlogFormData) {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);

  try {
    const { data: insertedData, error } = await supabase
      .from('blog_posts')
      .insert({
        title: data.title,
        content: data.content,
        eth_address: data.eth_address,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/');
    revalidatePath(`/author/${data.eth_address}`);
    return { success: true, data: insertedData };
  } catch (error) {
    console.error('Error creating blog post:', error);
    return { success: false, error: 'Failed to create blog post' };
  }
}
