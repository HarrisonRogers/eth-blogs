'use client';

import { useAccount } from 'wagmi';
import SetSubscriptionFee from './setSubscriptionFee';
import { useAuthor } from '@/hooks/useAuthor';
import NotFound from '@/components/utils/NotFound';

function EditAuthorPage() {
  const { address } = useAccount();
  const { data: author } = useAuthor(address);

  if (!author?.data || author.data.eth_address !== address) {
    return <NotFound />;
  }
  return (
    <div>
      <h1 className="text-4xl font-bold mb-7">Edit Author Page Settings</h1>
      <SetSubscriptionFee />
    </div>
  );
}

export default EditAuthorPage;
