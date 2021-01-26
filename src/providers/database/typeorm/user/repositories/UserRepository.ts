import { getRepository, Repository } from 'typeorm';
import IUserData, {
  CreateUserDTO,
  UpdateUserDTO,
} from '@domain/user/data/IUserData';
import UserModel from '@providers/database/typeorm/user/schemas/UserModel';

class UserRepository implements IUserData {
  private ormRepository: Repository<UserModel>;

  constructor() {
    this.ormRepository = getRepository(UserModel);
  }

  public async create(data: CreateUserDTO): Promise<UserModel> {
    const { name, email, location, phone } = data;
    const user = this.ormRepository.create({
      name,
      email,
      location,
      phone,
      active: true,
    });

    await this.ormRepository.save(user);
    return user;
  }

  public async update(data: UpdateUserDTO): Promise<UserModel | undefined> {
    const { id, name, email, location, phone } = data;
    await this.ormRepository.update(
      {
        id,
      },
      {
        name,
        email,
        location,
        phone,
      },
    );
    return this.ormRepository.findOne({
      where: {
        id,
      },
    });
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
}

export default UserRepository;
