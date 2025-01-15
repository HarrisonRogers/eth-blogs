import { createClient } from '@supabase/supabase-js';

// Supabase environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_SERVICE_KEY = process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string;

// Create a Supabase client for server-side actions
export const supabaseServerClient = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_KEY
);
