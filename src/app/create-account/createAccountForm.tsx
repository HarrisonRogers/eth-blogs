'use client';

import React, { useState } from 'react';
import { createAccount } from '@/actions/createAccount';
import { useForm } from 'react-hook-form';
import { useAccount } from 'wagmi';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { blogPostSchema } from '@/schemas/createAccount';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

type FormSchema = z.infer<typeof blogPostSchema>;

function CreateAccountForm() {
  const { address } = useAccount();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(blogPostSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    if (!address) {
      console.error('No connected wallet address found.');
      setError('Please connect your wallet.');
      return;
    }

    const formData = new FormData();
    formData.set('name', data.username);
    formData.set('eth_address', address);

    try {
      setIsPending(true);
      const result = await createAccount({
        name: data.username,
        eth_address: address,
      });
      if (result.success) {
        router.push('/');
      } else {
        setError(result.error || 'Failed to create account.');
      }
    } catch (err) {
      console.error('Error creating account:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to create account.'
      );
      setIsPending(false);
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
      <div>
        <Label htmlFor="name">Username</Label>
        <Input
          {...register('username')}
          placeholder="Username"
          className={errors.username ? 'border-red-500' : ''}
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="eth_address">ETH Address</Label>
        <Input
          {...register('ethAddress')}
          placeholder="ETH Address"
          value={address}
          disabled
          className={errors.ethAddress ? 'border-red-500' : ''}
        />
        {errors.ethAddress && (
          <p className="text-red-500 text-sm mt-1">
            {errors.ethAddress.message}
          </p>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Account'}
      </Button>
    </form>
  );
}

export default CreateAccountForm;
