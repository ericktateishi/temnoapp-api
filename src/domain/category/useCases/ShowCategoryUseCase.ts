import { inject, injectable } from 'tsyringe';
import IUseCase from '@domain/core/IUseCase';
import ICategoryData from '@domain/category/data/ICategoryData';
import CategoryEntity from '@domain/category/entities/CategoryEntity';

@injectable()
export default class ShowCategoryUseCase
  implements IUseCase<string, CategoryEntity | undefined> {
  constructor(
    @inject('CategoryData')
    private categoryData: ICategoryData,
  ) {}

  public async execute(id: string): Promise<CategoryEntity | undefined> {
    return this.categoryData.findById(id);
  }
}
