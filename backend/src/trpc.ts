import { initTRPC } from '@trpc/server';

const trpc = initTRPC.create();

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => [
    {
      test: 1,
    },
    {
      test: 2,
    },
  ]),
});

export type TRpcRouter = typeof trpcRouter;
