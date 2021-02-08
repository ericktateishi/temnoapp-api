import { Request, Response, NextFunction } from 'express';
import AppError from '@infra/http/shared/middlewares/AppError';

interface IErro extends Error {
  code?: string;
  sqlMessage?: string;
  statusCode: number;
  type: string;
}

const ApplicationError = (
  err: IErro,
  request: Request,
  response: Response,
  _: NextFunction,
) => {
  // eslint-disable-next-line no-console
  console.log(err);

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err.statusCode === 400) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err.code === 'ER_DUP_ENTRY') {
    return response.status(409).json({
      status: 'error',
      message: err.sqlMessage,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};

export default ApplicationError;
