import CategoryEntity from '@domain/category/entities/CategoryEntity';

export type CreateCategoryDTO = Pick<
  CategoryEntity,
  'name' | 'parentCategoryId'
>;

export type UpdateCategoryDTO = Pick<
  CategoryEntity,
  'id' | 'name' | 'parentCategoryId'
>;

export default interface ICategoryData {
  create(data: CreateCategoryDTO): Promise<CategoryEntity>;
  findAll(parent?: string): Promise<CategoryEntity[]>;
  findById(id: string): Promise<CategoryEntity | undefined>;
  update(data: UpdateCategoryDTO): Promise<CategoryEntity | undefined>;
  delete(id: string): Promise<boolean>;
}
