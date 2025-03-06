import { z } from 'zod';

export const zSignUpTrpcInput = z.object({
  nick: z
    .string()
    .min(2)
    .regex(
      /^[a-z0-9-]+$/,
      'Nick may contain only lowercase letters, number and dashes'
    ),
  email: z.string().min(2).email(),
  password: z.string().min(3),
});
