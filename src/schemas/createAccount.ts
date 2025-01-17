import { z } from 'zod';

export const blogPostSchema = z.object({
  username: z
    .string()
    .min(5, 'Username must be at least 5 characters long')
    .max(50, 'Username cannot exceed 50 characters'),
  ethAddress: z
    .string()
    .min(20, 'ETH Address must be at least 20 characters long'),
});
