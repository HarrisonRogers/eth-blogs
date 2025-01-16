import BlogPostForm from './blogPostForm';

export default async function Page() {
  return (
    <div className="w-1/2">
      <h1 className="text-3xl text-center font-bold mb-8">Create a new blog</h1>
      <BlogPostForm />
    </div>
  );
}
