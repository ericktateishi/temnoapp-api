import LocationEntity from '@domain/location/entities/LocationEntity';
import VendorEntity from '@domain/vendor/entities/VendorEntity';

export default class UserEntity {
  id: string;

  name: string;

  email: string;

  phone?: string;

  vendors?: VendorEntity[];

  locationId?: string;

  location?: LocationEntity;

  password?: string;

  active: boolean;

  created: Date;

  updated: Date;
}
