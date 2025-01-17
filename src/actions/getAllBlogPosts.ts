import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export async function getAllBlogPosts() {
  const { data: blogs, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Error fetching blogs:', error);
    return { success: false, error: 'Failed to fetch blogs' };
  }

  return { success: true, data: blogs };
}
