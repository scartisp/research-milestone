"use client";
import { useState } from 'react';
import { SignIn, SignUp } from "@clerk/nextjs";

export default function AuthToggle() {
  const [mode, setMode] = useState('sign-in');
  const clerkLook = {
    elements: {
      cardBox: 'shadow-none! border-0! bg-transparent!',
      card: 'shadow-none! bg-transparent!',
      footer: 'hidden!'
    },
  };


  if (mode === 'sign-in') {
    return (
      <div className="flex justify-center items-start py-16 min-h-screen">
        <div className="bg-white rounded-xl shadow-lg pb-6">
          <SignIn routing='hash' appearance={clerkLook} />
          <p className="text-center text-sm text-zinc-600">
            Don't have an account?{' '}
            <button className='cursor-pointer underline' onClick={() => setMode('sign-up')}>Create an account</button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start py-16 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg pb-6">
        <SignUp routing='hash'
          appearance={clerkLook}
        />
        <p className="text-center text-sm text-zinc-600">
          Already have an account?{' '}
          <button className='cursor-pointer underline' onClick={() => setMode('sign-in')}>Sign in</button>
        </p>
      </div>
    </div>
  );
}