import type { EthereumProvider } from 'viem';
import type { Address } from 'viem';
declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }

  interface BlogPost {
    title: string;
    content: string;
    author: Address;
    date: Date;
  }
}
