import LocationEntity from '@domain/location/entities/LocationEntity';

export default class UserEntity {
  id: string;

  name: string;

  email: string;

  phone?: string;

  locationId?: string;

  location?: LocationEntity;

  password?: string;

  active: boolean;

  created: Date;

  updated: Date;
}
