import { inject, injectable } from 'tsyringe';
import IUseCase from '@domain/core/IUseCase';
import ILocationData from '@domain/location/data/ILocationData';
import LocationEntity from '@domain/location/entities/LocationEntity';

@injectable()
export default class CreateUserUseCase
  implements IUseCase<string, LocationEntity | undefined> {
  constructor(
    @inject('LocationData')
    private locationData: ILocationData,
  ) {}

  public async execute(id: string): Promise<LocationEntity | undefined> {
    return this.locationData.findById(id);
  }
}
