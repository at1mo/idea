import cors from 'cors';
import express from 'express';
import { type AppContext, createAppContext } from './lib/ctx';
import { applyTrpcExpressApp } from './lib/trpc';
import { trpcRouter } from './router';

void (async () => {
  let ctx: AppContext | null = null;
  try {
    ctx = createAppContext();
    const app = express();

    app.use(cors());

    await applyTrpcExpressApp(app, ctx, trpcRouter);

    app.listen(3001, () => {
      console.info('run server: http://localhost:3001/');
    });
  } catch (error) {
    console.error(error);
    await ctx?.stop();
  }
})();
