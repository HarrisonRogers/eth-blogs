export interface BlogPost {
  title: string;
  content: string;
  date: string;
  author: string;
}

export interface BlogPostResponse {
  title: string;
  content: string;
  date: string;
  author: `0x${string}`;
}
