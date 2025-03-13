// eslint-disable-next-line import/order
import { env } from './lib/env';
import cors from 'cors';
import express from 'express';
import { applyCron } from './lib/cron';
import { type AppContext, createAppContext } from './lib/ctx';
import { logger } from './lib/logger';
import { applyPassportToExpressApp } from './lib/passport';
import { initSentry } from './lib/sentry';
import { applyTrpcExpressApp } from './lib/trpc';
import { trpcRouter } from './router';
import { presetDb } from './scripts/presetDb';

void (async () => {
  let ctx: AppContext | null = null;
  try {
    initSentry();
    ctx = createAppContext();
    await presetDb(ctx);
    const app = express();

    app.use(cors());
    applyPassportToExpressApp(app, ctx);
    await applyTrpcExpressApp(app, ctx, trpcRouter);
    applyCron(ctx);

    app.use(
      (
        error: unknown,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        logger.error('express', error);
        if (res.headersSent) {
          next(error);
          return;
        }
        res.status(500).send('Internal server error');
      }
    );

    app.listen(env.PORT, () => {
      logger.info('express', `run server: http://localhost:${env.PORT}/`);
    });
  } catch (error) {
    logger.error('app', error);
    await ctx?.stop();
  }
})();
