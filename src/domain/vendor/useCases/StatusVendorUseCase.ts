import { inject, injectable } from 'tsyringe';
import IUseCase from '@domain/core/IUseCase';
import IVendorData from '@domain/vendor/data/IVendorData';
import VendorEntity from '@domain/vendor/entities/VendorEntity';

@injectable()
export default class UpdateVendorUseCase
  implements IUseCase<string, VendorEntity | undefined> {
  constructor(
    @inject('VendorData')
    private vendorData: IVendorData,
  ) {}

  public async execute(id: string): Promise<VendorEntity | undefined> {
    return this.vendorData.status(id);
  }
}
