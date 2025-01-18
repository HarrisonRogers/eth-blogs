import { z } from 'zod';

export const subscriptionSchema = z.object({
  fee: z
    .number()
    .min(0, "Fee can't be negative")
    .max(1000, "Fee can't be more than 1000 ETH")
    .step(0.0001, 'Fee must be in increments of 0.0001 ETH'),
});
