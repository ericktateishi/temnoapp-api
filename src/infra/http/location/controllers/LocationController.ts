import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateLocationUseCase from '@domain/location/useCases/CreateLocationUseCase';
import ListLocationUseCase from '@domain/location/useCases/ListLocationUseCase';
import ShowLocationUseCase from '@domain/location/useCases/ShowLocationUseCase';
import UpdateLocationUseCase from '@domain/location/useCases/UpdateLocationUseCase';
import DeleteLocationUseCase from '@domain/location/useCases/DeleteLocationUseCase';
import SearchLocationUseCase from '@domain/location/useCases/SearchLocationUseCase';
import AppError from '@infra/http/shared/middlewares/AppError';

export default class LocationController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createLocationUseCase = container.resolve(CreateLocationUseCase);
    const location = await createLocationUseCase.execute(request.body);
    return response.json(location);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listLocationUseCase = container.resolve(ListLocationUseCase);
    const { limit, offset } = request.query;

    const location = await listLocationUseCase.execute({
      limit: Number(limit || 10),
      offset: Number(offset || 0),
    });
    return response.json(location);
  }

  public async search(request: Request, response: Response): Promise<Response> {
    const searchLocationUseCase = container.resolve(SearchLocationUseCase);
    const { word, limit, offset } = request.query;

    const location = await searchLocationUseCase.execute({
      word: word as string,
      limit: Number(limit || 10),
      offset: Number(offset || 0),
    });
    return response.json(location);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showLocationUseCase = container.resolve(ShowLocationUseCase);
    const { id } = request.params;

    const location = await showLocationUseCase.execute(id as string);
    return response.json(location);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateLocationUseCase = container.resolve(UpdateLocationUseCase);

    const location = await updateLocationUseCase.execute({
      ...request.body,
    });

    if (!location) throw new AppError('Could find location for update', 400);

    return response.json(location);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteLocationUseCase = container.resolve(DeleteLocationUseCase);
    const location = await deleteLocationUseCase.execute(request.params.id);
    if (!location) throw new AppError('Could find location for deleting', 400);
    return response.json(location);
  }
}
