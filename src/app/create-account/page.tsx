import React from 'react';
import CreateAccountForm from './createAccountForm';

function CreateAccountPage() {
  return (
    <div className="w-1/2">
      <h1 className="text-3xl text-center font-bold mb-8">Create Account</h1>

      <CreateAccountForm />
    </div>
  );
}

export default CreateAccountPage;
