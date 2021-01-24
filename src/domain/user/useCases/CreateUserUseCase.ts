import { inject, injectable } from 'tsyringe';
import IUseCase from '@domain/core/IUseCase';
import IUserData, { CreateUserDTO } from '@domain/user/data/IUserData';
import UserEntity from '@domain/user/entities/UserEntity';

@injectable()
export default class CreateUserUseCase
  implements IUseCase<CreateUserDTO, UserEntity> {
  constructor(
    @inject('UserData')
    private userData: IUserData,
  ) {}

  public async execute(data: CreateUserDTO): Promise<UserEntity> {
    return this.userData.create(data);
  }
}
