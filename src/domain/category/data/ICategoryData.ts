import CategoryEntity from '@domain/category/entities/CategoryEntity';

export type CreateCategoryDTO = Pick<
  CategoryEntity,
  'name' | 'parentCategoryId' | 'image'
>;

export type UpdateCategoryDTO = Pick<
  CategoryEntity,
  'id' | 'name' | 'parentCategoryId' | 'image'
>;

export default interface ICategoryData {
  create(data: CreateCategoryDTO): Promise<CategoryEntity>;
  findAll(parent?: string, all?: boolean): Promise<CategoryEntity[]>;
  findById(id: string): Promise<CategoryEntity | undefined>;
  update(data: UpdateCategoryDTO): Promise<CategoryEntity | undefined>;
  delete(id: string): Promise<boolean>;
}
