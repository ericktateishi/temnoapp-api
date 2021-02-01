export default class CategoryEntity {
  id: string;

  name: string;

  parentCategoryId?: string;

  parentCategory?: CategoryEntity;

  created: Date;

  updated: Date;
}
