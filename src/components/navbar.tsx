'use client';

import { ConnectKitButton } from 'connectkit';
import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from './themePicker';
import { Button } from './ui/button';
import { HomeIcon } from 'lucide-react';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost">
              <HomeIcon className="h-5 w-5" />
            </Button>
          </Link>
        </div>
        h1
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ConnectKitButton />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
