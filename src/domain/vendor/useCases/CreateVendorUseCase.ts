import { inject, injectable } from 'tsyringe';
import IUseCase from '@domain/core/IUseCase';
import IVendorData, { CreateVendorDTO } from '@domain/vendor/data/IVendorData';
import VendorEntity from '@domain/vendor/entities/VendorEntity';

@injectable()
export default class CreateVendorUseCase
  implements IUseCase<CreateVendorDTO, VendorEntity> {
  constructor(
    @inject('VendorData')
    private vendorData: IVendorData,
  ) {}

  public async execute(data: CreateVendorDTO): Promise<VendorEntity> {
    return this.vendorData.create(data);
  }
}
