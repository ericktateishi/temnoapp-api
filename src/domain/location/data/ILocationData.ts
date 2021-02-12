import LocationEntity from '@domain/location/entities/LocationEntity';

export type CreateLocationDTO = Pick<
  LocationEntity,
  | 'name'
  | 'address'
  | 'addressComplement'
  | 'neighbourhood'
  | 'city'
  | 'state'
  | 'postalCode'
  | 'lng'
  | 'lat'
>;

export type UpdateLocationDTO = Pick<
  LocationEntity,
  | 'id'
  | 'name'
  | 'address'
  | 'addressComplement'
  | 'neighbourhood'
  | 'city'
  | 'state'
  | 'postalCode'
  | 'lng'
  | 'lat'
>;

export type ListLocationResponse = {
  limit: number;
  offset: number;
  total: number;
  locations: LocationEntity[];
};

export default interface ILocationData {
  create(data: CreateLocationDTO): Promise<LocationEntity>;
  findAll(limit: number, offset: number): Promise<ListLocationResponse>;
  findById(id: string): Promise<LocationEntity | undefined>;
  update(data: UpdateLocationDTO): Promise<LocationEntity | undefined>;
  delete(id: string): Promise<boolean>;
  search(
    word: string,
    limit: number,
    offset: number,
  ): Promise<ListLocationResponse>;
}
