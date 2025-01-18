'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function deleteBlogPost(id: string, ethAddress: string) {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);

  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', Number(id))
    .eq('eth_address', ethAddress);

  if (error) throw error;

  revalidatePath('/');
  revalidatePath(`/blog/${ethAddress}/${id}`);
  revalidatePath(`/author/${ethAddress}`);

  return { success: true };
}
