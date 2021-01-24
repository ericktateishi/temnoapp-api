import { inject, injectable } from 'tsyringe';
import IUseCase from '@domain/core/IUseCase';
import IUserData, { UpdateUserDTO } from '@domain/user/data/IUserData';
import UserEntity from '@domain/user/entities/UserEntity';

@injectable()
export default class UpdateUserUseCase
  implements IUseCase<UpdateUserDTO, UserEntity | undefined> {
  constructor(
    @inject('UserData')
    private userData: IUserData,
  ) {}

  public async execute(data: UpdateUserDTO): Promise<UserEntity | undefined> {
    return this.userData.update(data);
  }
}
