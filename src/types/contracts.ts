export interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  eth_address: `0x${string}`;
}

export interface Subscription {
  author: `0x${string}`;
  subscriber: `0x${string}`;
  fee: bigint;
}
