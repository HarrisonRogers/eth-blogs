import { getBlogPosts } from '../app/actions/getBlogPosts';

export default async function BlogPosts() {
  // Fetch blog posts using the server action
  const posts = await getBlogPosts();

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.length === 0 && <p>No blog posts available.</p>}
      {posts.map((post) => (
        <div key={post.id} className="border border-gray-200 p-4 rounded-md">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>
            <strong>Author:</strong> {post.authors[0].name} (
            {post.authors[0].eth_address})
          </p>
          <p>
            <strong>Posted on:</strong>{' '}
            {new Date(post.created_at).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
