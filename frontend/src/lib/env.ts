import {
  zEnvHost,
  zEnvNonemptyTrimmed,
  zEnvNonemptyTrimmedRequiredOnNotLocal,
} from '@ideanick/shared/src/zod';
import { z } from 'zod';

export const zEnv = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  HOST_ENV: zEnvHost,
  SOURCE_VERSION: zEnvNonemptyTrimmedRequiredOnNotLocal,
  VITE_BACKEND_TRPC_URL: zEnvNonemptyTrimmed,
  VITE_FRONTEND_URL: zEnvNonemptyTrimmed,
  VITE_FRONTEND_SENTRY_DSN: zEnvNonemptyTrimmedRequiredOnNotLocal,
});

// eslint-disable-next-line node/no-process-env
export const env = zEnv.parse(process.env);
