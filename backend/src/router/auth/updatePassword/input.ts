import { z } from 'zod';

export const zUpdatePasswordTrpcInput = z.object({
  oldPassword: z.string().min(2),
  newPassword: z.string().min(2),
});
