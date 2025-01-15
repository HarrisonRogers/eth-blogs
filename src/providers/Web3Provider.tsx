'use client';

import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { baseSepolia } from 'wagmi/chains';

const queryClient = new QueryClient();

const config = createConfig(
  getDefaultConfig({
    chains: [baseSepolia],
    transports: {
      [baseSepolia.id]: http(
        process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL ||
          'https://sepolia.base.org'
      ),
    },
    appName: 'Ethereum Blogs',
    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
    appDescription: 'Subscription based blog post system on base chain',
  })
);

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
