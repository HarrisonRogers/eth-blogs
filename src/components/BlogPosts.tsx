import { useGetBlogPosts } from '../hooks/useGetBlogPosts';
import { useGetBlogPostContent } from '../hooks/useGetBlogPostContent';
import { Card } from './ui/card';
import { type Address } from 'viem';

export function BlogPosts() {
  const { posts, isLoading, isError, error } = useGetBlogPosts();

  if (isError) {
    return <div>Error loading blog posts: {error?.message}</div>;
  }

  if (isLoading) {
    return <div>Loading blog posts...</div>;
  }

  if (!posts || posts.length === 0) {
    return <div>No blog posts found</div>;
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((address: Address) => (
        <BlogPostCard key={address} address={address} />
      ))}
    </div>
  );
}

function BlogPostCard({ address }: { address: Address }) {
  const { data: post } = useGetBlogPostContent(address);

  if (!post) return null;

  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-sm text-gray-500">{post.date}</p>
      <p className="mt-2">{post.content}</p>
      <p className="mt-2 text-sm">Author: {post.author}</p>
    </Card>
  );
}
