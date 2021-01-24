import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateUserUseCase from '@domain/user/useCases/CreateUserUseCase';
import UpdateUserUseCase from '@domain/user/useCases/UpdateUserUseCase';
import InactivateUserUseCase from '@domain/user/useCases/InactivateUserUseCase';
import ActivateUserUseCase from '@domain/user/useCases/ActivateUserUseCase';
import ShowUserUseCase from '@domain/user/useCases/ShowUserUseCase';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createUserUseCase = container.resolve(CreateUserUseCase);
    const user = await createUserUseCase.execute(request.body);
    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserUseCase = container.resolve(UpdateUserUseCase);
    const user = await updateUserUseCase.execute(request.body);
    return response.json(user);
  }

  public async inactivate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const inactivateUserUseCase = container.resolve(InactivateUserUseCase);
    const user = await inactivateUserUseCase.execute(request.body.id);
    return response.json(user);
  }

  public async activate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const activateUserUseCase = container.resolve(ActivateUserUseCase);
    const user = await activateUserUseCase.execute(request.body.id);
    return response.json(user);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showUserUseCase = container.resolve(ShowUserUseCase);
    const user = await showUserUseCase.execute(request.query.email as string);
    return response.json(user);
  }
}
