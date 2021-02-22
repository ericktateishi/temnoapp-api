import { inject, injectable } from 'tsyringe';
import IUseCase from '@domain/core/IUseCase';
import IUserData from '@domain/user/data/IUserData';
import UserEntity from '@domain/user/entities/UserEntity';

@injectable()
export default class ShowByIdUserUseCase
  implements IUseCase<string, UserEntity | undefined> {
  constructor(
    @inject('UserData')
    private userData: IUserData,
  ) {}

  public async execute(id: string): Promise<UserEntity | undefined> {
    return this.userData.findById(id);
  }
}
