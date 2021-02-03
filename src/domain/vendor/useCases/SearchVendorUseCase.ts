import { inject, injectable } from 'tsyringe';
import IUseCase, { ListAllRequest } from '@domain/core/IUseCase';
import IVendorData, {
  SearchVendorRequest,
  ListVendorResponse,
} from '@domain/vendor/data/IVendorData';

export interface ISearchListVendorRequest
  extends SearchVendorRequest,
    ListAllRequest {}

@injectable()
export default class SearchVendorUseCase
  implements IUseCase<ISearchListVendorRequest, ListVendorResponse> {
  constructor(
    @inject('VendorData')
    private vendorData: IVendorData,
  ) {}

  public async execute({
    category,
    location,
    word,
    limit,
    offset,
  }: ISearchListVendorRequest): Promise<ListVendorResponse> {
    return this.vendorData.search(
      {
        category,
        location,
        word,
      },
      limit,
      offset,
    );
  }
}
