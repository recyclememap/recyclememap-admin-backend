import { NextFunction, Request, RequestHandler, Response } from 'express';
import { validationResult } from 'express-validator';
import { ApiError } from './errors';

export const facadeRequest =
  (requestFunction: RequestHandler, validate = true) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (validate) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          throw ApiError.BadRequest('Invalid value', errors.mapped());
        }
      }

      await requestFunction(req, res, next);
    } catch (e) {
      next(e);
    }
  };
