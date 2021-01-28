import { inject, injectable } from 'tsyringe';
import IUseCase from '@domain/core/IUseCase';
import IAuthData from '@domain/auth/data/IAuthData';
import UserEntity from '@domain/user/entities/UserEntity';

@injectable()
export default class VerifyTokenUseCase
  implements IUseCase<string, UserEntity> {
  constructor(
    @inject('AuthData')
    private authData: IAuthData,
  ) {}

  public async execute(token: string): Promise<UserEntity> {
    return this.authData.verifyToken(token);
  }
}
