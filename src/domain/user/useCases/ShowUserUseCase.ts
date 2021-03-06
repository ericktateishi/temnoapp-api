import { inject, injectable } from 'tsyringe';
import IUseCase from '@domain/core/IUseCase';
import IUserData from '@domain/user/data/IUserData';
import UserEntity from '@domain/user/entities/UserEntity';

@injectable()
export default class ShowUserUseCase
  implements IUseCase<string, UserEntity | undefined> {
  constructor(
    @inject('UserData')
    private userData: IUserData,
  ) {}

  public async execute(email: string): Promise<UserEntity | undefined> {
    return this.userData.findByEmail(email);
  }
}
