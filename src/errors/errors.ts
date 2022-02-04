import { StatusCodes } from 'http-status-codes';
import type { ValidationErrorType } from './validation';

export enum ErrorCodes {
  SomethingWentWrong = 'SOMETHING_WENT_WRONG',
  BadUserInput = ' BAD_USER_INPUT',
  NotAuthorized = 'NOT_AUTHORIZED',
  ValidationError = 'VALIDATION_ERROR',
}

export type DefaultSubError = Record<string, unknown>;
export type ServerSubErrors = ValidationErrorType;

export interface ServerErrorInput {
  message: string;
  code: ErrorCodes;
  status: number;
  reason?: string;
  errors?: ServerSubErrors;
}

export class ServerError extends Error {
  status: number;

  code: ErrorCodes;

  reason?: string;

  errors?: ServerSubErrors;

  constructor({ status, code, message, reason, errors }: ServerErrorInput) {
    super();
    this.status = status || StatusCodes.INTERNAL_SERVER_ERROR;
    this.code = code;
    this.message = message;
    this.reason = reason;
    this.errors = errors;
  }
}

// Not authorized
export class NotAuthorizedError extends ServerError {
  constructor(message: string) {
    super({
      message,
      code: ErrorCodes.NotAuthorized,
      status: StatusCodes.FORBIDDEN,
    });
  }
}

// Validation errors
export class ValidationError extends ServerError {
  constructor(message: string, errors?: ServerSubErrors) {
    super({
      message,
      code: ErrorCodes.ValidationError,
      status: StatusCodes.BAD_REQUEST,
      errors,
    });
  }
}

// Wrong params
export class BadUserInputError extends ServerError {
  constructor(message: string) {
    super({
      message,
      code: ErrorCodes.BadUserInput,
      status: StatusCodes.BAD_REQUEST,
    });
  }
}

// Use this if no one other applies
export class SomethingWentWrongError extends ServerError {
  constructor(message: string) {
    super({
      message,
      code: ErrorCodes.SomethingWentWrong,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
}
