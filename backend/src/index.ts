import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';
import { trpcRouter } from './trpc';

const app = express();

app.use(cors());

app.get('/ping', (req, res) => {
  res.send('pong');
});

const asd: number = 5;
console.info(asd)

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: trpcRouter,
  })
);

app.listen(3001, () => {
  console.info('run server: http://localhost:3001/');
});
