import UserEntity from '@domain/user/entities/UserEntity';

export type CreateUserDTO = {
  name: string;
  email: string;
  phone?: string;
  location: string;
};

export type UpdateUserDTO = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location: string;
};

export default interface IUserData {
  create(data: CreateUserDTO): Promise<UserEntity>;
  update(data: UpdateUserDTO): Promise<UserEntity | undefined>;
  inactivate(id: string): Promise<UserEntity | undefined>;
  activate(id: string): Promise<UserEntity | undefined>;
  findByEmail(email: string): Promise<UserEntity | undefined>;
}
