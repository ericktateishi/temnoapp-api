import { inject, injectable } from 'tsyringe';
import IUseCase from '@domain/core/IUseCase';
import ICategoryData from '@domain/category/data/ICategoryData';
import CategoryEntity from '@domain/category/entities/CategoryEntity';

@injectable()
export default class ListCategoryUseCase
  implements
    IUseCase<
      {
        parent: string;
        all: boolean;
      },
      CategoryEntity[]
    > {
  constructor(
    @inject('CategoryData')
    private categoryData: ICategoryData,
  ) {}

  public async execute({
    parent,
    all,
  }: {
    parent: string;
    all: boolean;
  }): Promise<CategoryEntity[]> {
    return this.categoryData.findAll(parent, all);
  }
}
