'use client';

import { SignOutButton } from '@clerk/nextjs';
import { useToast } from './ui/use-toast';
import { useDispatch } from 'react-redux';
import { clearUser  } from '@/features/user/userSlice';

function SignOutLink() {
  const { toast } = useToast();
  const dispatch = useDispatch();

  return (
    <SignOutButton>
      <button
        className="w-full text-left"
        onClick={() => {
          // Your Redux + toast logic
          toast({ description: 'Logout Successful' });
          dispatch(clearUser());
        }}
      >
        Logout
      </button>
    </SignOutButton>
  );
}

export default SignOutLink;
