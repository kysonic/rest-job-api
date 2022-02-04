import { Context } from 'koa';
import {
  ValidationError as SequelizeValidationError,
  DatabaseError,
} from 'sequelize';
import { SomethingWentWrongError, ValidationError } from '@errors/errors';
import User from '@models/User';
import { reconstructSequelizeErrors } from '@utils/errors';
import { getAuth } from 'firebase-admin/auth';

export const register = async (ctx: Context) => {
  try {
    const { email, password, firstName, lastName } = ctx.request.body;

    const user = await User.create(ctx.request.body);

    await getAuth().createUser({
      uid: user.toJSON().id.toString(),
      email,
      emailVerified: false,
      password,
      displayName: `${firstName} ${lastName}`,
      disabled: false,
    });

    await getAuth().setCustomUserClaims(user.toJSON().id.toString(), {
      admin: true,
    });

    ctx.body = user.toJSON();
  } catch (err) {
    if (err instanceof SequelizeValidationError) {
      throw new ValidationError(
        'Cannot create user',
        reconstructSequelizeErrors(err.errors),
      );
    }

    if (err instanceof DatabaseError) {
      throw new ValidationError(err.message);
    }

    if (err instanceof Error) {
      throw new SomethingWentWrongError(err.message);
    }
  }
};

export const login = async (ctx: Context) => {
  const { email, password } = ctx.request.body;

  const firebaseUser = await getAuth().getUserByEmail(email);

  const additionalClaims = {
    premiumAccount: true,
  };

  const customToken = await getAuth().createCustomToken(
    firebaseUser.uid,
    additionalClaims,
  );

  ctx.body = {
    token: customToken,
    user: firebaseUser,
  };
};
