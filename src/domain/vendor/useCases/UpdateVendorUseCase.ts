import { inject, injectable } from 'tsyringe';
import IUseCase from '@domain/core/IUseCase';
import IVendorData, { UpdateVendorDTO } from '@domain/vendor/data/IVendorData';
import VendorEntity from '@domain/vendor/entities/VendorEntity';

@injectable()
export default class UpdateVendorUseCase
  implements IUseCase<UpdateVendorDTO, VendorEntity | undefined> {
  constructor(
    @inject('VendorData')
    private vendorData: IVendorData,
  ) {}

  public async execute(
    data: UpdateVendorDTO,
  ): Promise<VendorEntity | undefined> {
    return this.vendorData.update(data);
  }
}
