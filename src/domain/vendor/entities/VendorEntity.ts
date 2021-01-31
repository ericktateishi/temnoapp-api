import VendorHoursEntity from '@domain/vendor/entities/VendorHoursEntity';
import LocationEntity from '@domain/location/entities/LocationEntity';

export default class VendorEntity {
  id: string;

  user: string;

  name: string;

  phone: string;

  location?: LocationEntity;

  description?: string;

  category?: string;

  hours?: VendorHoursEntity;

  facebook?: string;

  instagram?: string;

  twitter?: string;

  active: boolean;

  created: Date;

  updated: Date;
}
