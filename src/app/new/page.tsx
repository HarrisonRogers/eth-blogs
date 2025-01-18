import { getAuthor } from '@/actions/getAuthor';
import BlogPostForm from './blogPostForm';

export default async function NewPostPage() {
  // const { data: author } = await getAuthor(address);

  return <BlogPostForm />;
}
