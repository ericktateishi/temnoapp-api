import { container } from 'tsyringe';

import IUserData from '@domain/user/data/IUserData';
import UserRepository from '@providers/database/typeorm/user/repositories/UserRepository';

import IVendorData from '@domain/vendor/data/IVendorData';
import VendorRepository from '@providers/database/typeorm/vendor/repositories/VendorRepository';

import IAuthData from '@domain/auth/data/IAuthData';
import AuthProvider from '@providers/auth/AuthProvider';

container.registerSingleton<IUserData>('UserData', UserRepository);
container.registerSingleton<IVendorData>('VendorData', VendorRepository);
container.registerSingleton<IAuthData>('AuthData', AuthProvider);
