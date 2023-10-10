import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { StatusCodes } from '@root/commons/constants';
import { ApiError } from '@root/utils/errors';
import { privateKey } from '@utils/tests/testData';

jest.mock('express-oauth2-jwt-bearer', () => ({
  __esModule: true,
  auth: jest.fn().mockImplementation((opts = {}) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const authHeader = req.get('Authorization');
        const JWT = authHeader?.split(' ')[1];

        if (JWT) {
          try {
            jwt.verify(JWT, privateKey, {
              audience: opts.AUDIENCE,
              issuer: opts.ISSUER_BASE_URL
            });
          } catch (e) {
            throw new ApiError(StatusCodes.Unathorized, 'JWT is not correct');
          }

          next();
        } else {
          throw new ApiError(StatusCodes.Unathorized, 'JWT is not presented');
        }
      } catch (e) {
        next(e);
      }
    };
  })
}));
