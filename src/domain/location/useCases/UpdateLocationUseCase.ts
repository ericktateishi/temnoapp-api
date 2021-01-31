import { inject, injectable } from 'tsyringe';
import IUseCase from '@domain/core/IUseCase';
import ILocationData, {
  UpdateLocationDTO,
} from '@domain/location/data/ILocationData';
import LocationEntity from '@domain/location/entities/LocationEntity';

@injectable()
export default class CreateUserUseCase
  implements IUseCase<UpdateLocationDTO, LocationEntity | undefined> {
  constructor(
    @inject('LocationData')
    private locationData: ILocationData,
  ) {}

  public async execute(
    data: UpdateLocationDTO,
  ): Promise<LocationEntity | undefined> {
    return this.locationData.update(data);
  }
}
