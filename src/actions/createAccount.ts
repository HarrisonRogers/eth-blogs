'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export type AccountFormData = {
  name: string;
  eth_address: string;
};

export async function createAccount(data: AccountFormData) {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);

  try {
    // First check if the ETH address already exists
    const { data: existingAccount } = await supabase
      .from('authors')
      .select('eth_address')
      .eq('eth_address', data.eth_address)
      .single();

    if (existingAccount) {
      return {
        success: false,
        error: 'An account with this ETH address already exists',
      };
    }

    const { data: insertedData, error } = await supabase
      .from('authors')
      .insert({
        name: data.name,
        eth_address: data.eth_address,
      })
      .select()
      .single();

    if (error) {
      // Check specifically for unique constraint violations
      if (error.code === '23505') {
        // PostgreSQL unique violation code
        return {
          success: false,
          error: 'An account with this ETH address already exists',
        };
      }

      console.error('Database error:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/');
    return { success: true, data: insertedData };
  } catch (error) {
    console.error('Error creating account:', error);
    return { success: false, error: 'Failed to create account' };
  }
}
