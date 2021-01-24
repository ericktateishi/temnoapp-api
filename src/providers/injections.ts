import { container } from 'tsyringe';
import IUserData from '@domain/user/data/IUserData';
import UserRepository from '@providers/database/typeorm/user/repositories/UserRepository';

container.registerSingleton<IUserData>('UserData', UserRepository);
