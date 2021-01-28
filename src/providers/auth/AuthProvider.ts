import IAuthData from '@domain/auth/data/IAuthData';
import UserEntity from '@domain/user/entities/UserEntity';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

type JWTReturn = {
  user: UserEntity;
};

const saltRounds = 10;

class AuthProvider implements IAuthData {
  public async encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, saltRounds);
  }

  public async comparePasswords(
    attempt: string,
    correct: string,
  ): Promise<boolean> {
    return bcrypt.compare(attempt, correct);
  }

  public createToken(user: UserEntity): string {
    return jsonwebtoken.sign({ user }, process.env.APP_SECRET as string);
  }

  public verifyToken(token: string): UserEntity {
    const decoded = jsonwebtoken.verify(
      token,
      process.env.APP_SECRET as string,
    ) as JWTReturn;

    return decoded.user;
  }
}

export default AuthProvider;
