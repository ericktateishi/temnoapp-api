import { getRepository, Like, Repository } from 'typeorm';
import IUserData, {
  CreateUserDTO,
  IUpdateUserDTO,
  ListUserResponse,
} from '@domain/user/data/IUserData';
import UserModel from '@providers/database/typeorm/user/schemas/UserModel';

class UserRepository implements IUserData {
  private ormRepository: Repository<UserModel>;

  constructor() {
    this.ormRepository = getRepository(UserModel);
  }

  public async search(
    limit: number,
    offset: number,
    email?: string,
  ): Promise<ListUserResponse> {
    const where = email
      ? {
          email: Like(`%${email.toLowerCase()}%`),
        }
      : {};

    const users = await this.ormRepository.find({
      where,
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
      users,
    };
  }

  public async create(data: CreateUserDTO): Promise<UserModel> {
    const user = this.ormRepository.create({
      ...data,
      email: data.email.toLowerCase(),
      active: true,
      id: undefined,
    });

    await this.ormRepository.save(user);
    const userComplete = await this.ormRepository.findOne({
      where: {
        id: user.id,
      },
      relations: ['vendors', 'vendors.hours', 'location'],
    });
    return userComplete || user;
  }

  public async update(data: IUpdateUserDTO): Promise<UserModel | undefined> {
    const { id } = data;
    await this.ormRepository.update(
      {
        id,
      },
      {
        ...data,
        email: data.email.toLowerCase(),
      },
    );
    const user = await this.ormRepository.findOne({
      where: { id },
      relations: ['vendors', 'vendors.hours', 'location'],
    });
    return user;
  }

  public async status(id: string): Promise<UserModel | undefined> {
    const user = await this.ormRepository.findOne({ where: { id } });

    if (!user) return undefined;

    await this.ormRepository.update(
      {
        id,
      },
      {
        active: !user?.active,
      },
    );

    return {
      ...user,
      active: !user?.active,
    };
  }

  public async findByEmail(email: string): Promise<UserModel | undefined> {
    return this.ormRepository.findOne({
      where: {
        email: email.toLowerCase(),
      },
      relations: ['vendors', 'vendors.hours', 'location'],
    });
  }

  public async findById(id: string): Promise<UserModel | undefined> {
    return this.ormRepository.findOne({
      where: { id },
      relations: ['vendors', 'vendors.hours', 'location'],
    });
  }
}

export default UserRepository;
