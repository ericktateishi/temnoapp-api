import { getRepository, Repository } from 'typeorm';
import ILocationData, {
  CreateLocationDTO,
  UpdateLocationDTO,
  ListLocationResponse,
} from '@domain/location/data/ILocationData';
import LocationModel from '@providers/database/typeorm/location/schemas/LocationModel';
import LocationEntity from '@domain/location/entities/LocationEntity';

class LocationRepository implements ILocationData {
  private ormRepository: Repository<LocationModel>;

  constructor() {
    this.ormRepository = getRepository(LocationModel);
  }

  public async create(data: CreateLocationDTO): Promise<LocationEntity> {
    const location = this.ormRepository.create({
      ...data,
      id: undefined,
    });

    await this.ormRepository.save(location);
    return location;
  }

  public async findAll(
    limit: number,
    offset: number,
  ): Promise<ListLocationResponse> {
    const locations = await this.ormRepository.find({
      order: {
        created: 'DESC',
      },
      take: limit,
      skip: offset,
    });

    const total = await this.ormRepository.count();

    return {
      total,
      offset,
      limit,
      locations,
    };
  }

  public async findById(id: string): Promise<LocationEntity | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async update(
    data: UpdateLocationDTO,
  ): Promise<LocationEntity | undefined> {
    const { id } = data;
    await this.ormRepository.update(
      {
        id,
      },
      {
        ...data,
      },
    );
    return this.ormRepository.findOne(id);
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.ormRepository.delete(id);
    return (result.affected || 0) === 1;
  }
}

export default LocationRepository;
