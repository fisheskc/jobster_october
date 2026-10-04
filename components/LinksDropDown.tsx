"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
// import { AlignLeft } from 'lucide-react';
import { Button } from './ui/button';
import links from '@/utils/links';
import Link from 'next/link';
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
// import UserIcon from '../app/admin/register/UserIcon'
import SignOutLink from './SignOutLink';
// import { auth } from '@clerk/nextjs/server';
import { LuUser } from "react-icons/lu";
import { usePathname } from "next/navigation";


function LinksDropDown() {

  const { user } = useUser();
  const pathname = usePathname();
  // hide dropdown during registration
  if (pathname === "/register" || pathname === "/login") return null;

  // console.log("This is the user:", user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='flex gap-4 max-w-[100px]'>
          {/* <LuAlignLeft className='w-6 h-6' /> */}
          {user ? (
           <img
              src={user.imageUrl ?? "/default-avatar.png"}
              alt="user"
              className="w-6 h-6 rounded-full object-cover"
            />
          ) : (
          <LuUser className="w-6 h-6" />
        )}
          <span className='sr-only'>Toggle links</span>
        </Button>
        {/* <Button variant='outline' size='icon'>
          <span className='sr-only'> <UserIcon /></span>
        </Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40' align='start' sideOffset={10}>
          {/* <UserButton /> */}
          {!user && (
          <>
           <DropdownMenuItem asChild>         
              <Link href="/login" className="w-full text-left">Login</Link>
           </DropdownMenuItem>
           <DropdownMenuSeparator />
           <DropdownMenuItem asChild>  
               <Link href="/register" className="w-full text-left">Register</Link>
            </DropdownMenuItem>
          </>
        )}
          {user && (
          <>
        {links.map((link) => {
          return (
            <DropdownMenuItem key={link.href} asChild>
              <Link href={link.href} className='flex items-center gap-x-2 '>
                {link.icon} <span className='capitalize'>{link.label}</span>
              </Link>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </>
      )} 
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default LinksDropDown;