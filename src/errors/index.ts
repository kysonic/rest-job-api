import { Context, Next } from 'koa';
import { ServerError } from './errors';

export const errorMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof ServerError) {
      ctx.status = err.status;
      ctx.body = {
        code: err.code,
        message: err.message,
        reason: err.reason ?? null,
        errors: err.errors ?? [],
      };
      ctx.app.emit('error', err, ctx);
    }
  }
};

export const errorLogging = (err: Error) => {
  console.log('LOG:', err.message); // Log errors somehow
};
