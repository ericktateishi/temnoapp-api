import { container } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import CreateUserUseCase from '@domain/user/useCases/CreateUserUseCase';
import UpdateUserUseCase from '@domain/user/useCases/UpdateUserUseCase';
import InactivateUserUseCase from '@domain/user/useCases/InactivateUserUseCase';
import ActivateUserUseCase from '@domain/user/useCases/ActivateUserUseCase';
import ShowUserUseCase from '@domain/user/useCases/ShowUserUseCase';
import AppError from '@infra/http/shared/middlewares/AppError';
import { IAuthRequested } from '@infra/http/shared/middlewares/Auth';

export default class UserController {
  public async create(
    request: Request,
    _response: Response,
    next: NextFunction,
  ): Promise<void> {
    const createUserUseCase = container.resolve(CreateUserUseCase);
    const user = await createUserUseCase.execute(request.body);
    (request as IAuthRequested).user = user;

    next();
  }

  public async update(
    request: Request,
    _response: Response,
    next: NextFunction,
  ): Promise<void> {
    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const user = await updateUserUseCase.execute({
      ...request.body,
      id: (request as IAuthRequested).user.id,
    });

    if (!user) throw new AppError('Could find user for update', 400);

    (request as IAuthRequested).user = user;

    next();
  }

  public async inactivate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const inactivateUserUseCase = container.resolve(InactivateUserUseCase);
    const user = await inactivateUserUseCase.execute(request.body.id);
    if (!user) throw new AppError('Could find user for inactivate', 400);
    return response.json(user);
  }

  public async activate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const activateUserUseCase = container.resolve(ActivateUserUseCase);
    const user = await activateUserUseCase.execute(request.body.id);
    if (!user) throw new AppError('Could find user for activate', 400);
    return response.json(user);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showUserUseCase = container.resolve(ShowUserUseCase);
    const user = await showUserUseCase.execute(request.query.email as string);
    return response.json(user);
  }
}
