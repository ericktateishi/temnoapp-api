import IUserData, {
  CreateUserDTO,
  IUpdateUserDTO,
} from '@domain/user/data/IUserData';
import UserEntity from '@domain/user/entities/UserEntity';

class FakeUserProvider implements IUserData {
  private users: UserEntity[] = [
    {
      id: 'id-1',
      email: 'mail@test.com',
      name: 'Test',
      password: 'secret',
      phone: '00 0000 0000',
      active: true,
      created: new Date(),
      updated: new Date(),
    },
    {
      id: 'id-2',
      email: 'mail-2@test.com',
      name: 'Test',
      phone: '00 0000 0000',
      active: true,
      created: new Date(),
      updated: new Date(),
    },
  ];

  public async create(data: CreateUserDTO): Promise<UserEntity> {
    const user: UserEntity = {
      id: 'id-2',
      active: true,
      created: new Date(),
      updated: new Date(),
      ...data,
    };

    this.users.push(user);
    return user;
  }

  public async update(data: IUpdateUserDTO): Promise<UserEntity | undefined> {
    const user = this.users.find(u => u.id === data.id);
    if (!user) return undefined;

    const newUser: UserEntity = {
      ...user,
      ...data,
    };
    this.users.map(u => {
      if (u.id === data.id) return newUser;
      return u;
    });

    return newUser;
  }

  public async status(id: string): Promise<UserEntity | undefined> {
    const user = this.users.find(u => u.id === id);
    if (!user) return undefined;

    const newUser: UserEntity = {
      ...user,
      active: !user.active,
    };
    this.users.map(u => {
      if (u.id === id) return newUser;
      return u;
    });

    return newUser;
  }

  public async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.users.find(u => u.email === email);
  }

  public async findById(id: string): Promise<UserEntity | undefined> {
    return this.users.find(u => u.id === id);
  }
}

export default FakeUserProvider;
