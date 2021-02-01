import UserEntity from '@domain/user/entities/UserEntity';

export type CreateUserDTO = Pick<
  UserEntity,
  'name' | 'email' | 'phone' | 'locationId' | 'password'
>;

export interface IUpdateUserDTO
  extends Pick<
    UserEntity,
    'id' | 'name' | 'email' | 'phone' | 'locationId' | 'password'
  > {
  oldPassword?: string;
}

export default interface IUserData {
  create(data: CreateUserDTO): Promise<UserEntity>;
  update(data: IUpdateUserDTO): Promise<UserEntity | undefined>;
  status(id: string): Promise<UserEntity | undefined>;
  findByEmail(email: string): Promise<UserEntity | undefined>;
  findById(id: string): Promise<UserEntity | undefined>;
}
