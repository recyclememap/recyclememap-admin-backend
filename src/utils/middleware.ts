import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from '@commons/constants';
import { ApiError, AuthError } from '@utils/errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .send({ message: err.message, error: err.error });
  }

  next(err);
};

export const authErrorHandler = (
  err: AuthError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.status === StatusCodes.Unathorized) {
    return res.sendStatus(err.status);
  }

  next(err);
};

export const defaultErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res
    .status(StatusCodes.InternalServerError)
    .send({ message: 'Internal Server Error' });
};
