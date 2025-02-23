import cors from 'cors';
import express from 'express';
import { applyTrpcExpressApp } from './lib/trpc';
import { trpcRouter } from './router';

const app = express();

app.use(cors());

app.get('/ping', (req, res) => {
  res.send('pong');
});

applyTrpcExpressApp(app, trpcRouter);

app.listen(3001, () => {
  console.info('run server: http://localhost:3001/');
});
