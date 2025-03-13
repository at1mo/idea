import { Prisma, type Idea } from '@prisma/client';
import { type AppContext } from '../lib/ctx';
import { sendMostLikedIdeasEmail } from '../lib/emails';

export const getMostLikedIdeas = async ({
  ctx,
  limit = 10,
  now,
}: {
  ctx: AppContext;
  limit?: number;
  now?: Date;
}) => {
  const sqlNow = now
    ? Prisma.sql`${now.toISOString()}::timestamp`
    : Prisma.sql`now()`;
  return await ctx.prisma.$queryRaw<
    Array<Pick<Idea, 'id' | 'nick' | 'name'> & { thisMonthLikesCount: number }>
  >`
  select i.id, i.nick, i.name, count(il."ideaId")::int as "thisMonthLikesCount"
    from "Idea" i
      join "IdeaLike" il ON i.id = il."ideaId"
      where il."createdAt" > ${sqlNow} - interval '1 month'
      and i."blockedAt" is null
      group by i.id, i.nick, i.name
      order by "thisMonthLikesCount" desc
      limit ${limit};
`;
};

export const notifyAboutMostLikedIdeas = async ({
  ctx,
  limit,
  now,
}: {
  ctx: AppContext;
  limit?: number;
  now?: Date;
}) => {
  const mostLikedIdeas = await getMostLikedIdeas({ ctx, limit, now });

  if (!mostLikedIdeas.length) {
    return;
  }

  const users = await ctx.prisma.user.findMany({
    select: {
      email: true,
    },
  });
  for (const user of users) {
    await sendMostLikedIdeasEmail({ user, ideas: mostLikedIdeas });
  }
};
