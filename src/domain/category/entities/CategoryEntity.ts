export default class LocationEntity {
  id: string;

  name: string;

  parentCategoryId?: string;

  parentCategory?: LocationEntity;

  created: Date;

  updated: Date;
}
