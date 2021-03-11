import { inject, injectable } from 'tsyringe';
import IUseCase from '@domain/core/IUseCase';
import IAuthData from '@domain/auth/data/IAuthData';
import UserEntity from '@domain/user/entities/UserEntity';

@injectable()
export default class CreateTokenUseCase
  implements IUseCase<UserEntity, string> {
  constructor(
    @inject('AuthData')
    private authData: IAuthData,
  ) {}

  public async execute(user: UserEntity): Promise<string> {
    delete user.password;
    delete user.vendors;
    delete user.location;
    return this.authData.createToken(user);
  }
}
