import { createClient } from '@/utils/supabase/client';
import { revalidatePath } from 'next/cache';

const supabase = createClient();

export async function deleteBlogPost(id: string, ethAddress: string) {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', Number(id))
    .eq('eth_address', ethAddress);

  if (error) throw error;

  revalidatePath('/');
  revalidatePath(`/blog/${ethAddress}/${id}`);

  return { success: true };
}
