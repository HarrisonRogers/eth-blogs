'use client';

import React from 'react';
import { createAccount } from '@/actions/createAccount';
import { useForm } from 'react-hook-form';
import { useAccount } from 'wagmi';

function CreateAccountForm() {
  const { address } = useAccount();
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
    createAccount({ name: data.name, eth_address: address });
  });

  return <div>CreateAccountForm</div>;
}

export default CreateAccountForm;
