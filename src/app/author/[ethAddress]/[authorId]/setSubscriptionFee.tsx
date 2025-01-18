'use client';

import { subscriptionSchema } from '@/schemas/subscriptionSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { parseEther } from 'viem';
import { useWriteContract } from 'wagmi';
import { z } from 'zod';
import BlogSubscriptionsAbi from '@/utils/blogSubscriptionsAbi';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

function SetSubscriptionFee() {
  const { writeContract, isPending, isSuccess, isError, error } =
    useWriteContract();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
  });

  console.error(errors);

  const handleWriteToContract = (data: SubscriptionFormData) => {
    try {
      const feeValue = parseFloat(data.fee.toString());
      if (isNaN(feeValue)) {
        throw new Error('Invalid fee value');
      }

      writeContract({
        address: process.env
          .NEXT_PUBLIC_SUBSCRIPTION_CONTRACT_ADDRESS as `0x${string}`,
        abi: BlogSubscriptionsAbi,
        functionName: 'setSubscriptionFee',
        args: [parseEther(feeValue.toString())],
      });
    } catch (err) {
      console.error('Error processing fee:', err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleWriteToContract)}
      className="flex flex-col gap-4"
    >
      <Label htmlFor="fee">Set Subscription Fee (ETH)</Label>
      <Input
        {...register('fee', {
          valueAsNumber: true,
        })}
        type="number"
        step="0.0001"
        placeholder="0.1 Eth"
      />
      {errors.fee && <p className="text-red-600">{errors.fee.message}</p>}
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Setting Subscription Fee...' : 'Set Subscription Fee'}
      </Button>
      {isSuccess && (
        <p className="text-green-600">Subscription fee set successfully</p>
      )}
      {isError && <p className="text-red-600">{error?.message}</p>}
    </form>
  );
}

export default SetSubscriptionFee;
