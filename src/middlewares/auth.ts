import { BadUserInputError } from '@errors/errors';
import { Context, Next } from 'koa';
import { getAuth } from 'firebase-admin/auth';
import User from '@models/User';

export default async (ctx: Context, next: Next) => {
  if (!ctx.headers.authorization) {
    throw new BadUserInputError('Authorization not provided');
  }

  if (!ctx.headers.authorization.startsWith('Bearer')) {
    throw new BadUserInputError('Authorization is malformed');
  }

  const [_, idToken] = ctx.headers.authorization.split(' ');

  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);

    if (!decodedToken.email_verified) {
      throw new BadUserInputError('Email not verified');
    }

    ctx.state.user = await User.findOne({
      where: { id: decodedToken.uid },
    });

    await next();
  } catch (err) {
    if (err instanceof Error) {
      throw new BadUserInputError(err.message);
    }
  }
};
