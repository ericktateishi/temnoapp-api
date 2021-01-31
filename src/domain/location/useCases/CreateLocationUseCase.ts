import { inject, injectable } from 'tsyringe';
import IUseCase from '@domain/core/IUseCase';
import ILocationData, {
  CreateLocationDTO,
} from '@domain/location/data/ILocationData';
import LocationEntity from '@domain/location/entities/LocationEntity';

@injectable()
export default class CreateLocationUseCase
  implements IUseCase<CreateLocationDTO, LocationEntity> {
  constructor(
    @inject('LocationData')
    private locationData: ILocationData,
  ) {}

  public async execute(data: CreateLocationDTO): Promise<LocationEntity> {
    return this.locationData.create(data);
  }
}
