/* eslint-disable node/no-process-env */
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
  VITE_CLOUDINARY_CLOUD_NAME: zEnvNonemptyTrimmed,
  VITE_MIXPANEL_API_KEY: zEnvNonemptyTrimmedRequiredOnNotLocal,
});

const envFromBackend = (window as any).webappEnvFromBackend;

export const env = zEnv.parse(
  envFromBackend?.replaceMeWithPublicEnv ? process.env : envFromBackend
);
