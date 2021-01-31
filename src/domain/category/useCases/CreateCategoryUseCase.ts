import { inject, injectable } from 'tsyringe';
import IUseCase from '@domain/core/IUseCase';
import ICategoryData, {
  CreateCategoryDTO,
} from '@domain/category/data/ICategoryData';
import CategoryEntity from '@domain/category/entities/CategoryEntity';

@injectable()
export default class CreateCategoryUseCase
  implements IUseCase<CreateCategoryDTO, CategoryEntity> {
  constructor(
    @inject('CategoryData')
    private categoryData: ICategoryData,
  ) {}

  public async execute(data: CreateCategoryDTO): Promise<CategoryEntity> {
    return this.categoryData.create(data);
  }
}
