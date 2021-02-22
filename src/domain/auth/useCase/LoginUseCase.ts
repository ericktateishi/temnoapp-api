import { inject, injectable } from 'tsyringe';
import IUseCase from '@domain/core/IUseCase';
import IAuthData, { LoginDTO } from '@domain/auth/data/IAuthData';
import UserEntity from '@domain/user/entities/UserEntity';
import IUserData from '@domain/user/data/IUserData';
import AppError from '@infra/http/shared/middlewares/AppError';

@injectable()
export default class VerifyTokenUseCase
  implements IUseCase<LoginDTO, UserEntity> {
  constructor(
    @inject('AuthData')
    private authData: IAuthData,
    @inject('UserData')
    private userData: IUserData,
  ) {}

  public async execute({ email, password }: LoginDTO): Promise<UserEntity> {
    const user = await this.userData.findByEmail(email);

    if (!user || !user?.password || !user.active)
      throw new AppError('User not found', 401);

    const result = await this.authData.comparePasswords(
      password,
      user?.password,
    );

    if (!result) throw new AppError('Incorrect data', 400);
    return user;
  }
}
