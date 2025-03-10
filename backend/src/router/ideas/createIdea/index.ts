import { trpcLoggedProcedure } from '../../../lib/trpc';
import { zCreateIdeaTrpcInput } from './input';

export const createIdeaTrpcRoute = trpcLoggedProcedure
  .input(zCreateIdeaTrpcInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me) {
      throw Error('Not authenticated');
    }

    const existIdea = await ctx.prisma.idea.findUnique({
      where: {
        nick: input.nick,
      },
    });

    if (existIdea) {
      throw Error('Idea with this nick already exists');
    }

    await ctx.prisma.idea.create({
      data: { ...input, authorId: ctx.me.id },
    });

    return true;
  });
