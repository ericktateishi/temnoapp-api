import { inject, injectable } from 'tsyringe';
import IUseCase from '@domain/core/IUseCase';
import ICategoryData, {
  UpdateCategoryDTO,
} from '@domain/category/data/ICategoryData';
import CategoryEntity from '@domain/category/entities/CategoryEntity';

@injectable()
export default class UpdateCategoryUseCase
  implements IUseCase<UpdateCategoryDTO, CategoryEntity | undefined> {
  constructor(
    @inject('CategoryData')
    private categoryData: ICategoryData,
  ) {}

  public async execute(
    data: UpdateCategoryDTO,
  ): Promise<CategoryEntity | undefined> {
    return this.categoryData.update(data);
  }
}
