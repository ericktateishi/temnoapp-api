import VendorHoursEntity from '@domain/vendor/entities/VendorHoursEntity';
import LocationEntity from '@domain/location/entities/LocationEntity';
import UserEntity from '@domain/user/entities/UserEntity';

export default class VendorEntity {
  id: string;

  userId: string;

  user?: UserEntity;

  name: string;

  phone: string;

  locationId?: string;

  location?: LocationEntity;

  description?: string;

  category?: string;

  hoursId?: string;

  hours?: VendorHoursEntity;

  facebook?: string;

  instagram?: string;

  twitter?: string;

  active: boolean;

  created: Date;

  updated: Date;
}
