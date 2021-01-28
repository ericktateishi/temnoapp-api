import UserEntity from '@domain/user/entities/UserEntity';

export type LoginDTO = {
  email: string;
  password: string;
};

export default interface IAuthData {
  encryptPassword(password: string): Promise<string>;
  comparePasswords(attempt: string, correct: string): Promise<boolean>;
  createToken(user: UserEntity): string;
  verifyToken(token: string): UserEntity;
}
