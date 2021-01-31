import { inject, injectable } from 'tsyringe';
import IUseCase, { ListAllRequest } from '@domain/core/IUseCase';
import ILocationData, {
  ListLocationResponse,
} from '@domain/location/data/ILocationData';

@injectable()
export default class ListLocationUseCase
  implements IUseCase<ListAllRequest, ListLocationResponse> {
  constructor(
    @inject('LocationData')
    private locationData: ILocationData,
  ) {}

  public async execute({
    limit,
    offset,
  }: ListAllRequest): Promise<ListLocationResponse> {
    return this.locationData.findAll(limit, offset);
  }
}
