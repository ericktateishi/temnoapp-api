import { inject, injectable } from 'tsyringe';
import IUseCase from '@domain/core/IUseCase';
import ICategoryData from '@domain/category/data/ICategoryData';

@injectable()
export default class DeleteCategoryUseCase
  implements IUseCase<string, boolean> {
  constructor(
    @inject('CategoryData')
    private categoryData: ICategoryData,
  ) {}

  public async execute(id: string): Promise<boolean> {
    return this.categoryData.delete(id);
  }
}
