import { inject, injectable } from 'tsyringe';
import IUseCase from '@domain/core/IUseCase';
import ILocationData from '@domain/location/data/ILocationData';

@injectable()
export default class DeleteLocationUseCase
  implements IUseCase<string, boolean> {
  constructor(
    @inject('LocationData')
    private locationData: ILocationData,
  ) {}

  public async execute(id: string): Promise<boolean> {
    return this.locationData.delete(id);
  }
}
