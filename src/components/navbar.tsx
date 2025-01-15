'use client';

import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from './themePicker';
import { Button } from './ui/button';
import { HomeIcon } from 'lucide-react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

function Navbar() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = async () => {
    await connect({ connector: injected() });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-20 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost">
              <HomeIcon className="h-5 w-5" />
            </Button>
          </Link>
        </div>
        <h1 className="text-2xl font-bold font-sixtyfour ml-36">
          Ethereum Blogs
        </h1>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <Button onClick={() => disconnect()}>
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </Button>
          ) : (
            <Button onClick={handleConnect}>Connect Wallet</Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
