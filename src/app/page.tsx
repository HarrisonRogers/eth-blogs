// import BlogPosts from '@/components/BlogPosts';
import { getAllBlogPosts } from '@/actions/getAllBlogPosts';
import PostCard from '@/components/postCard';

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {blogs.map((blog) => (
          <PostCard post={blog} key={blog.id} />
        ))}
      </div>
    </div>
  );
}
