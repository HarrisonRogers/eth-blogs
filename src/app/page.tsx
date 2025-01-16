import BlogPosts from '@/components/BlogPosts';
import Link from '@/components/ui/link';

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-8">Ethereum Blogs</h1>

      <BlogPosts />

      <Link href="/new" className="mt-10">
        New Blog
      </Link>
    </div>
  );
}
