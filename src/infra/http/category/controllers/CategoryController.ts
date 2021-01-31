import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateCategoryUseCase from '@domain/category/useCases/CreateCategoryUseCase';
import ListCategoryUseCase from '@domain/category/useCases/ListCategoryUseCase';
import ShowCategoryUseCase from '@domain/category/useCases/ShowCategoryUseCase';
import UpdateCategoryUseCase from '@domain/category/useCases/UpdateCategoryUseCase';
import DeleteCategoryUseCase from '@domain/category/useCases/DeleteCategoryUseCase';
import AppError from '@infra/http/shared/middlewares/AppError';

export default class CategoryController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
    const category = await createCategoryUseCase.execute(request.body);
    return response.json(category);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listCategoryUseCase = container.resolve(ListCategoryUseCase);
    const { parent } = request.query;

    const category = await listCategoryUseCase.execute(parent as string);
    return response.json(category);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showCategoryUseCase = container.resolve(ShowCategoryUseCase);
    const { id } = request.params;

    const category = await showCategoryUseCase.execute(id as string);
    return response.json(category);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateCategoryUseCase = container.resolve(UpdateCategoryUseCase);

    const category = await updateCategoryUseCase.execute({
      ...request.body,
    });

    if (!category) throw new AppError('Could find category for update', 400);

    return response.json(category);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteCategoryUseCase = container.resolve(DeleteCategoryUseCase);
    const category = await deleteCategoryUseCase.execute(request.params.id);
    if (!category) throw new AppError('Could find category for deleting', 400);
    return response.json(category);
  }
}
