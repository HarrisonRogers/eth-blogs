import BlogPosts from '@/components/BlogPosts';
import Link from '@/components/ui/link';
import { createClient } from '@/utils/supabase/client';

export default async function Home() {
  const supabase = createClient();
  const { data: blogs, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Error fetching blogs:', error);
    return <div>Error fetching blogs</div>;
  }

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-8">Recent Posts...</h1>

      <BlogPosts blogs={blogs} />

      <Link href="/new" className="mt-10">
        New Blog
      </Link>
    </div>
  );
}
