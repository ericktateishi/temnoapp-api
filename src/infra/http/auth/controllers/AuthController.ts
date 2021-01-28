import { container } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';
import { IAuthRequested } from '@infra/http/shared/middlewares/Auth';
import LoginUseCase from '@domain/auth/useCase/LoginUseCase';

export default class VendorController {
  public async login(
    request: Request,
    _response: Response,
    next: NextFunction,
  ): Promise<void> {
    const loginUseCase = container.resolve(LoginUseCase);
    const user = await loginUseCase.execute(request.body);

    (request as IAuthRequested).user = user;
    next();
  }
}
