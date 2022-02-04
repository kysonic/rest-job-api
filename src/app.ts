if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line global-require
  require('module-alias/register');
}

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { errorMiddleware, errorLogging } from '@errors/index';
import authRouter from '@routes/auth';
import postRouter from '@routes/posts';
import db from '@db/index';
import '@models/associations';
import cors from '@koa/cors';
import '@services/firebase';

const app = new Koa();

// Middlewares
app.use(bodyParser());
app.use(cors());

// Errors
app.use(errorMiddleware);

// Routes
  app.use(authRouter.routes()).use(authRouter.allowedMethods());
app.use(postRouter.routes()).use(postRouter.allowedMethods());

// Errors logging
app.on('error', errorLogging);

async function start() {
  try {
    await db.authenticate();
    await db.sync({ force: false });
    app.listen(4000, () => console.log('Listening 4000'));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
