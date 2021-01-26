import { inject, injectable } from 'tsyringe';
import IUseCase, { ListAllRequest } from '@domain/core/IUseCase';
import IVendorData, {
  ListVendorResponse,
} from '@domain/vendor/data/IVendorData';

@injectable()
export default class ListVendorUseCase
  implements IUseCase<ListAllRequest, ListVendorResponse> {
  constructor(
    @inject('VendorData')
    private vendorData: IVendorData,
  ) {}

  public async execute({
    limit,
    offset,
  }: ListAllRequest): Promise<ListVendorResponse> {
    return this.vendorData.findAll(limit, offset);
  }
}
