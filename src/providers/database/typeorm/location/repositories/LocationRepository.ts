import { getRepository, Repository, Like } from 'typeorm';
import ILocationData, {
  CreateLocationDTO,
  UpdateLocationDTO,
  ListLocationResponse,
} from '@domain/location/data/ILocationData';
import LocationModel from '@providers/database/typeorm/location/schemas/LocationModel';
import AppError from '@infra/http/shared/middlewares/AppError';

class LocationRepository implements ILocationData {
  private ormRepository: Repository<LocationModel>;

  constructor() {
    this.ormRepository = getRepository(LocationModel);
  }

  public async search(
    word: string,
    limit: number,
    offset: number,
  ): Promise<ListLocationResponse> {
    const locations = await this.ormRepository.find({
      where: [
        {
          name: Like(`%${word}%`),
        },
        {
          neighbourhood: Like(`%${word}%`),
        },
        {
          address: Like(`%${word}%`),
        },
      ],
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

  public async create(data: CreateLocationDTO): Promise<LocationModel> {
    const duplicated = await this.ormRepository.findOne({
      postalCode: data.postalCode,
      address: data.address,
    });

    if (duplicated && duplicated.id)
      throw new AppError('Location already exists!', 409);

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

  public async findById(id: string): Promise<LocationModel | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async update(
    data: UpdateLocationDTO,
  ): Promise<LocationModel | undefined> {
    const { id } = data;
    await this.ormRepository.update(
      {
        id,
      },
      {
        ...data,
      },
    );
    return this.ormRepository.findOne({ where: { id } });
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.ormRepository.delete(id);
    return (result.affected || 0) === 1;
  }
}

export default LocationRepository;
