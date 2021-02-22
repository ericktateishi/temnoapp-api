import { container } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import CreateUserUseCase from '@domain/user/useCases/CreateUserUseCase';
import UpdateUserUseCase from '@domain/user/useCases/UpdateUserUseCase';
import StatusUserUseCase from '@domain/user/useCases/StatusUserUseCase';
import ShowUserUseCase from '@domain/user/useCases/ShowUserUseCase';
import SearchUserUseCase from '@domain/user/useCases/SearchUserUseCase';
import ShowByIdUserUseCase from '@domain/user/useCases/ShowByIdUserUseCase';
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

    if (!(request as IAuthRequested).isAdmin && request.body.adminPassword)
      throw new AppError('Not allowed', 401);

    const user = await updateUserUseCase.execute({
      ...request.body,
      id: (request as IAuthRequested).isAdmin
        ? request.body.id
        : (request as IAuthRequested).user.id,
    });

    if (!user) throw new AppError('Could find user for update', 400);

    (request as IAuthRequested).user = user;

    next();
  }

  public async status(request: Request, response: Response): Promise<Response> {
    const statusUserUseCase = container.resolve(StatusUserUseCase);
    const user = await statusUserUseCase.execute(request.body.id);
    if (!user) throw new AppError('Could find user for change status', 400);
    return response.json(user);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showUserUseCase = container.resolve(ShowUserUseCase);
    const user = await showUserUseCase.execute(request.query.email as string);
    return response.json(user);
  }

  public async showById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const showByIdUserUseCase = container.resolve(ShowByIdUserUseCase);
    const user = await showByIdUserUseCase.execute(request.params.id as string);
    return response.json(user);
  }

  public async search(request: Request, response: Response): Promise<Response> {
    const searchUserUseCase = container.resolve(SearchUserUseCase);
    const { email, limit, offset } = request.query;

    const users = await searchUserUseCase.execute({
      limit: Number(limit || 10),
      offset: Number(offset || 0),
      email: email as string,
    });
    return response.json(users);
  }
}
