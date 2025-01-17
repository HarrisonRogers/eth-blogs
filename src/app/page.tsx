import BlogPosts from '@/components/BlogPosts';
import { getAllBlogPosts } from '@/actions/getAllBlogPosts';

export default async function Home() {
  const { success, data: blogs, error } = await getAllBlogPosts();

  if (!blogs || !success || error) {
    return <div>{error}</div>;
  }

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold font-sixtyfour mb-16">
        Ethereum Blogs
      </h1>

      <BlogPosts blogs={blogs} />
    </div>
  );
}
