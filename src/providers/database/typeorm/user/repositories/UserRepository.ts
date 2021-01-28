import { getRepository, Repository } from 'typeorm';
import IUserData, {
  CreateUserDTO,
  IUpdateUserDTO,
} from '@domain/user/data/IUserData';
import UserModel from '@providers/database/typeorm/user/schemas/UserModel';

class UserRepository implements IUserData {
  private ormRepository: Repository<UserModel>;

  constructor() {
    this.ormRepository = getRepository(UserModel);
  }

  public async create(data: CreateUserDTO): Promise<UserModel> {
    const user = this.ormRepository.create({
      ...data,
      active: true,
      id: undefined,
    });

    await this.ormRepository.save(user);
    return user;
  }

  public async update(data: IUpdateUserDTO): Promise<UserModel | undefined> {
    const { id } = data;
    await this.ormRepository.update(
      {
        id,
      },
      {
        ...data,
      },
    );
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
      relations: ['vendors', 'vendors.hours'],
    });
    return user;
  }

  public async inactivate(id: string): Promise<UserModel | undefined> {
    await this.ormRepository.update(
      {
        id,
      },
      {
        active: false,
      },
    );

    return this.ormRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async activate(id: string): Promise<UserModel | undefined> {
    await this.ormRepository.update(
      {
        id,
      },
      {
        active: true,
      },
    );

    return this.ormRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async findByEmail(email: string): Promise<UserModel | undefined> {
    return this.ormRepository.findOne({
      where: {
        email,
      },
      relations: ['vendors', 'vendors.hours'],
    });
  }

  public async findById(id: string): Promise<UserModel | undefined> {
    return this.ormRepository.findOne({
      where: {
        id,
      },
      relations: ['vendors', 'vendors.hours'],
    });
  }
}

export default UserRepository;
