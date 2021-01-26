import UserEntity from '@domain/user/entities/UserEntity';

export type CreateUserDTO = Pick<
  UserEntity,
  'name' | 'email' | 'phone' | 'location'
>;

export type UpdateUserDTO = Pick<
  UserEntity,
  'id' | 'name' | 'email' | 'phone' | 'location'
>;

export default interface IUserData {
  create(data: CreateUserDTO): Promise<UserEntity>;
  update(data: UpdateUserDTO): Promise<UserEntity | undefined>;
  inactivate(id: string): Promise<UserEntity | undefined>;
  activate(id: string): Promise<UserEntity | undefined>;
  findByEmail(email: string): Promise<UserEntity | undefined>;
}
