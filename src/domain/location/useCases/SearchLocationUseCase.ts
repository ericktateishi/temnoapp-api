import { inject, injectable } from 'tsyringe';
import IUseCase, { ListAllRequest } from '@domain/core/IUseCase';
import ILocationData, {
  ListLocationResponse,
} from '@domain/location/data/ILocationData';

export interface ISearchListLocationRequest extends ListAllRequest {
  word: string;
}

@injectable()
export default class SearchLocationUseCase
  implements IUseCase<ISearchListLocationRequest, ListLocationResponse> {
  constructor(
    @inject('LocationData')
    private locationData: ILocationData,
  ) {}

  public async execute({
    word,
    limit,
    offset,
  }: ISearchListLocationRequest): Promise<ListLocationResponse> {
    return this.locationData.search(word, limit, offset);
  }
}
