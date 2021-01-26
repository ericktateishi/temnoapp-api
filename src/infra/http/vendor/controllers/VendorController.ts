import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateVendorUseCase from '@domain/vendor/useCases/CreateVendorUseCase';
import ListVendorUseCase from '@domain/vendor/useCases/ListVendorUseCase';
import ShowVendorUseCase from '@domain/vendor/useCases/ShowVendorUseCase';

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

  public async show(request: Request, response: Response): Promise<Response> {
    const showVendorUseCase = container.resolve(ShowVendorUseCase);
    const { id } = request.query;

    const vendor = await showVendorUseCase.execute(id as string);
    return response.json(vendor);
  }
}