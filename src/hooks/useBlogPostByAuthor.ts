import { useQuery } from '@tanstack/react-query';
import { Database } from '../../database.types';
import { getBlogPostByAuthor } from '@/actions/getPostByAuthor';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

type QueryResponse = {
  success: boolean;
  data: BlogPost[] | null;
  error?: string;
};

export function useBlogPostByAuthor(ethAddress: string | undefined) {
  return useQuery<QueryResponse, Error>({
    queryKey: ['blog-post-by-author', ethAddress],
    queryFn: async () => {
      if (!ethAddress) {
        return { success: true, data: [] as BlogPost[] };
      }
      const response = await getBlogPostByAuthor(ethAddress);
      return { ...response, data: response.data || null };
    },
    enabled: !!ethAddress,
    staleTime: 5 * 60 * 1000,
  });
}
