import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export async function getAuthor(ethAddress: string) {
  const { data, error } = await supabase
    .from('authors')
    .select('*')
    .eq('eth_address', ethAddress)
    .single();

  if (error) console.error(error);

  return { success: true, data };
}
