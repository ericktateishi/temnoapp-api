import VendorEntity from '@domain/vendor/entities/VendorEntity';

export type CreateVendorDTO = Pick<
  VendorEntity,
  | 'userId'
  | 'name'
  | 'phone'
  | 'locationId'
  | 'description'
  | 'category'
  | 'hours'
  | 'facebook'
  | 'instagram'
  | 'twitter'
>;

export type UpdateVendorDTO = Pick<
  VendorEntity,
  | 'id'
  | 'userId'
  | 'name'
  | 'phone'
  | 'locationId'
  | 'description'
  | 'category'
  | 'hours'
  | 'facebook'
  | 'instagram'
  | 'twitter'
>;

export type ListVendorResponse = {
  limit: number;
  offset: number;
  total: number;
  vendors: VendorEntity[];
};

export default interface IVendorData {
  create(data: CreateVendorDTO): Promise<VendorEntity>;
  findAll(limit: number, offset: number): Promise<ListVendorResponse>;
  findById(id: string): Promise<VendorEntity | undefined>;
  update(data: UpdateVendorDTO): Promise<VendorEntity | undefined>;
  status(id: string): Promise<VendorEntity | undefined>;
}
