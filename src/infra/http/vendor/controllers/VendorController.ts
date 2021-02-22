import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateVendorUseCase from '@domain/vendor/useCases/CreateVendorUseCase';
import ListVendorUseCase from '@domain/vendor/useCases/ListVendorUseCase';
import ShowVendorUseCase from '@domain/vendor/useCases/ShowVendorUseCase';
import UpdateVendorUseCase from '@domain/vendor/useCases/UpdateVendorUseCase';
import StatusVendorUseCase from '@domain/vendor/useCases/StatusVendorUseCase';
import SearchVendorUseCase from '@domain/vendor/useCases/SearchVendorUseCase';
import AppError from '@infra/http/shared/middlewares/AppError';

export default class VendorController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createVendorUseCase = container.resolve(CreateVendorUseCase);
    const vendor = await createVendorUseCase.execute(request.body);
    return response.json(vendor);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listVendorUseCase = container.resolve(ListVendorUseCase);
    const { limit, offset } = request.query;

    const vendor = await listVendorUseCase.execute({
      limit: Number(limit || 10),
      offset: Number(offset || 0),
    });
    return response.json(vendor);
  }

  public async search(request: Request, response: Response): Promise<Response> {
    const searchVendorUseCase = container.resolve(SearchVendorUseCase);
    const {
      limit,
      offset,
      category,
      location,
      word,
      inactivated,
    } = request.query;

    const vendor = await searchVendorUseCase.execute({
      limit: Number(limit || 10),
      offset: Number(offset || 0),
      category: category as string,
      location: location as string,
      word: word as string,
      inactivated: !!inactivated,
    });
    return response.json(vendor);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showVendorUseCase = container.resolve(ShowVendorUseCase);
    const { id } = request.params;

    const vendor = await showVendorUseCase.execute(id as string);
    return response.json(vendor);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateVendorUseCase = container.resolve(UpdateVendorUseCase);

    const vendor = await updateVendorUseCase.execute({
      ...request.body,
    });

    if (!vendor) throw new AppError('Could find vendor for update', 400);

    return response.json(vendor);
  }

  public async status(request: Request, response: Response): Promise<Response> {
    const statusVendorUseCase = container.resolve(StatusVendorUseCase);
    const vendor = await statusVendorUseCase.execute(request.body.id);
    if (!vendor) throw new AppError('Could find vendor for change status', 400);
    return response.json(vendor);
  }
}
