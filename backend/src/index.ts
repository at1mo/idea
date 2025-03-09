// eslint-disable-next-line import/order
import { env } from './lib/env';
import cors from 'cors';
import express from 'express';
import { applyCron } from './lib/cron';
import { type AppContext, createAppContext } from './lib/ctx';
import { applyPassportToExpressApp } from './lib/passport';
import { applyTrpcExpressApp } from './lib/trpc';
import { trpcRouter } from './router';
import { presetDb } from './scripts/presetDb';

void (async () => {
  let ctx: AppContext | null = null;
  try {
    ctx = createAppContext();
    await presetDb(ctx);
    const app = express();

    app.use(cors());
    applyPassportToExpressApp(app, ctx);
    await applyTrpcExpressApp(app, ctx, trpcRouter);
    applyCron(ctx);

    app.listen(env.PORT, () => {
      console.info(`run server: http://localhost:${env.PORT}/`);
    });
  } catch (error) {
    console.error(error);
    await ctx?.stop();
  }
})();
