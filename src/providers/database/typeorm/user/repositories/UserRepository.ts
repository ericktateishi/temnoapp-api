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
        email,
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
