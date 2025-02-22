import { initTRPC } from '@trpc/server';

const ideas = [
  {
    nick: 'nick1',
    name: 'Name1',
    description: 'description1',
  },
  {
    nick: 'nick2',
    name: 'Name2',
    description: 'description2',
  },
];

const trpc = initTRPC.create();

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return { ideas };
  }),
});

export type TrpcRouter = typeof trpcRouter;
