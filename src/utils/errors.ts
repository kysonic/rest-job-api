import { ServerSubErrors } from '@errors/errors';
import { ValidationErrorItem } from 'sequelize';

export const reconstructSequelizeErrors = (
  errors: Array<ValidationErrorItem>,
): ServerSubErrors => {
  const subErrors: ServerSubErrors = {};

  try {
    errors.forEach((error) => {
      if (error && error.path) {
        subErrors[error.path] = subErrors[error.path] || [];
        subErrors[error.path].push(error.message);
      }
    });
    return subErrors;
  } catch (err) {
    console.log(err);
    return subErrors;
  }
};
