import { container } from 'tsyringe';
import UserEntity from '@domain/user/entities/UserEntity';
import { Request, Response, NextFunction } from 'express';
import CreateTokenUseCase from '@domain/auth/useCase/CreateTokenUseCase';
import VerifyTokenUseCase from '@domain/auth/useCase/VerifyTokenUseCase';
import AppError from './AppError';

export const AUTH_HEADER = process.env.APP_AUTH_HEADER as string;

export interface IAuthRequested extends Request {
  user: UserEntity;
}

export const authGenerate = async (request: Request, response: Response) => {
  const createTokenUseCase = container.resolve(CreateTokenUseCase);
  if (!(request as IAuthRequested).user || !(request as IAuthRequested).user.id)
    throw new AppError('Invalid user, cannot authenticate user', 401);

  const token = await createTokenUseCase.execute(
    (request as IAuthRequested).user,
  );
  response.header(process.env.APP_AUTH_HEADER as string, token);
  response.sendStatus(200);
};

export const authValidate = async (
  request: Request,
  _response: Response,
  next: NextFunction,
) => {
  const verifyTokenUseCase = container.resolve(VerifyTokenUseCase);

  const token = request.get(AUTH_HEADER);
  if (!token) throw new AppError('Invalid auth token', 401);

  try {
    const user = await verifyTokenUseCase.execute(token);
    if (!user || !user.id) throw new AppError('Invalid auth token', 401);

    (request as IAuthRequested).user = user;
    next();
  } catch (error) {
    throw new AppError('Invalid auth token', 401);
  }
};
