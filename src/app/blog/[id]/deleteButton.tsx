'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import { deleteBlogPost } from './action';
import { Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';

type DeleteButtonProps = {
  id: number;
  authorAddress: string;
};

function DeleteButton({ id, authorAddress }: DeleteButtonProps) {
  const router = useRouter();
  const { address } = useAccount();

  // Don't render the button if addresses don't match
  if (!address || address.toLowerCase() !== authorAddress.toLowerCase()) {
    return null;
  }

  const handleDelete = async () => {
    await deleteBlogPost(String(id));
    router.refresh();
    router.push('/');
  };

  return (
    <Button onClick={handleDelete} className="bg-red-700 hover:bg-red-800 mt-4">
      <Trash2Icon className="w-4 h-4 text-white" />
    </Button>
  );
}

export default DeleteButton;
