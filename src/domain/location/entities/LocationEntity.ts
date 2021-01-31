export default class LocationEntity {
  id: string;

  name: string;

  address: string;

  addressComplement?: string;

  neighbourhood: string;

  city: string;

  state: string;

  postalCode: string;

  lng?: number;

  lat?: number;

  created: Date;

  updated: Date;
}
