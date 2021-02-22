/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { inject, injectable } from 'tsyringe';
import IUseCase from '@domain/core/IUseCase';
import IUserData, { IUpdateUserDTO } from '@domain/user/data/IUserData';
import UserEntity from '@domain/user/entities/UserEntity';
import IAuthData from '@domain/auth/data/IAuthData';
import AppError from '@infra/http/shared/middlewares/AppError';

@injectable()
export default class UpdateUserUseCase
  implements IUseCase<IUpdateUserDTO, UserEntity | undefined> {
  constructor(
    @inject('UserData')
    private userData: IUserData,
    @inject('AuthData')
    private authData: IAuthData,
  ) {}

  public async execute(data: IUpdateUserDTO): Promise<UserEntity | undefined> {
    if (data.password && data.oldPassword) {
      const oldUser = await this.userData.findById(data.id);
      if (!oldUser || !oldUser.id) return undefined;

      if (!oldUser.password) throw new AppError('Old password invalid', 403);

      const result = await this.authData.comparePasswords(
        data.oldPassword,
        oldUser.password!,
      );

      if (!result) throw new AppError('Old password invalid', 403);
      data.password = await this.authData.encryptPassword(data.password);
      delete data.oldPassword;
    }

    if (data.adminPassword) {
      data.password = await this.authData.encryptPassword(data.adminPassword);
      delete data.adminPassword;
    }

    return this.userData.update(data);
  }
}
