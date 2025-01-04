'use client';

import { useAccount } from 'wagmi';

export default function Home() {
  const { address, isConnected, isConnecting } = useAccount();

  return (
    <div>
      <h1>Ethereum Blogs</h1>

      {isConnected ? <div>{address}</div> : <div>Not connected</div>}
      {isConnecting && <div>Connecting...</div>}
    </div>
  );
}
