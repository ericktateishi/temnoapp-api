import { inject, injectable } from 'tsyringe';
import IUseCase from '@domain/core/IUseCase';
import IUserData, { CreateUserDTO } from '@domain/user/data/IUserData';
import IAuthData from '@domain/auth/data/IAuthData';
import UserEntity from '@domain/user/entities/UserEntity';

@injectable()
export default class CreateUserUseCase
  implements IUseCase<CreateUserDTO, UserEntity> {
  constructor(
    @inject('UserData')
    private userData: IUserData,
    @inject('AuthData')
    private authData: IAuthData,
  ) {}

  public async execute(data: CreateUserDTO): Promise<UserEntity> {
    if (data.password)
      data.password = await this.authData.encryptPassword(data.password);

    return this.userData.create(data);
  }
}
