import VendorHoursEntity from '@domain/vendor/entities/VendorHoursEntity';
import LocationEntity from '@domain/location/entities/LocationEntity';
import UserEntity from '@domain/user/entities/UserEntity';
import CategoryEntity from '@domain/category/entities/CategoryEntity';

export default class VendorEntity {
  id: string;

  userId: string;

  user?: UserEntity;

  name: string;

  phone: string;

  locationId?: string;

  location?: LocationEntity;

  description?: string;

  categoryId?: string;

  category?: CategoryEntity;

  hoursId?: string;

  hours?: VendorHoursEntity;

  facebook?: string;

  instagram?: string;

  twitter?: string;

  active: boolean;

  created: Date;

  updated: Date;
}
