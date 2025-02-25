'use client';

import { ConnectKitButton } from 'connectkit';
import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from './themePicker';
import { Button } from './ui/button';
import { HomeIcon } from 'lucide-react';
import { useAuthor } from '@/hooks/useAuthor';
import { useAccount } from 'wagmi';
import { Avatar, AvatarFallback } from './ui/avatar';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

function Navbar() {
  const pathname = usePathname();
  const { address } = useAccount();
  const { data: author } = useAuthor(address);
  return (
    <nav
      className={cn(
        pathname.includes('blog') ? 'absolute' : 'fixed',
        'top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
      )}
    >
      <div className="flex h-20 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost">
              <HomeIcon className="h-5 w-5" />
            </Button>
          </Link>
          {!author?.data ? (
            <Link href="/create-account">
              <Button variant="secondary">Create Account</Button>
            </Link>
          ) : (
            <Link href={`/author/${author?.data.eth_address}`}>
              <Avatar className="hover:scale-105 transition-all duration-300 active:scale-95">
                <AvatarFallback>
                  {author?.data.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
          )}
        </div>
        <Link href="/new">
          <Button variant="default">Create Blog</Button>
        </Link>
        <div className="flex items-center gap-2">
          <ConnectKitButton />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
