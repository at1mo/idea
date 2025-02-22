import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { trpcRouter } from './trpc';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: trpcRouter,
  })
);

app.listen(3001, () => {
  console.log('run server: http://localhost:3001/');
});
