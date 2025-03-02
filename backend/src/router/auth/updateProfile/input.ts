import { z } from 'zod';

export const zUpdateProfileTrpcInput = z.object({
  nick: z
    .string()
    .min(2)
    .regex(
      /^[a-z0-9-]+$/,
      'Nick may contain only lowercase letters, number and dashes'
    ),
  name: z.string().max(50).default(''),
});
