import { useQuery } from '@tanstack/react-query';
import { getAuthor } from '@/actions/getAuthor';
import { Database } from '../../database.types';

type Author = Database['public']['Tables']['authors']['Row'];

type QueryResponse = {
  success: boolean;
  data: Author | null;
  error?: string;
};

export function useAuthor(ethAddress: string | undefined) {
  return useQuery<QueryResponse>({
    queryKey: ['author', ethAddress],
    queryFn: () => {
      if (!ethAddress) {
        return Promise.resolve({ success: true, data: null });
      }
      return getAuthor(ethAddress);
    },
    // Don't fetch if we don't have an ethAddress
    enabled: !!ethAddress,
    // You can adjust this value based on your needs:
    // - Shorter time: More real-time but more API calls
    // - Longer time: Better performance but potentially stale data
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
