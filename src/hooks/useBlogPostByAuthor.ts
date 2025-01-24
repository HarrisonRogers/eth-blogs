import { useQuery } from '@tanstack/react-query';
import { Tables } from '../../database.types';
import { getBlogPostByAuthor } from '@/actions/getPostByAuthor';

type BlogPost = Tables<'blog_posts'>;

type QueryResponse = {
  success: boolean;
  data: BlogPost[] | null;
  error?: string;
};

export function useBlogPostByAuthor(
  ethAddress: string | undefined,
  isSubscribed: boolean = false
) {
  return useQuery<QueryResponse, Error>({
    queryKey: ['blog-post-by-author', ethAddress, isSubscribed],
    queryFn: async () => {
      if (!ethAddress) {
        return { success: true, data: [] as BlogPost[] };
      }
      const response = await getBlogPostByAuthor(ethAddress);

      // If user is not subscribed, only return the first two posts
      if (!isSubscribed && response.data) {
        return {
          ...response,
          data: response.data.slice(0, 2),
        };
      }

      return { ...response, data: response.data || null };
    },
    enabled: !!ethAddress,
    staleTime: 5 * 60 * 1000,
  });
}
