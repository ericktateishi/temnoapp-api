import VendorHoursEntity from '@domain/vendor/entities/VendorHoursEntity';

export default class VendorEntity {
  id: string;

  user: string;

  name: string;

  phone: string;

  location: string;

  description?: string;

  category?: string;

  subCategory?: string;

  hours?: VendorHoursEntity;

  facebook?: string;

  instagram?: string;

  twitter?: string;

  active: boolean;

  created: Date;

  updated: Date;
}
