import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { HandMetal } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import UserAccountNav from './UserAccountNav';


async function Navbar() {
  const session = await getServerSession(authOptions); // 1️⃣ this is done on the server...


  return (
    <div className='bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
      <div className='container flex items-center justify-between'>
        <Link href='/'>
          <HandMetal />
        </Link>
        {session?.user ? (
          <UserAccountNav /> // 2️⃣... and the Signout Button needs 'use client' so we export it
        ) : (
        <Link className={buttonVariants()} href='/sign-in'>
          Sign in
        </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
