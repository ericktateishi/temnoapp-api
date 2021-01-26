import { container } from 'tsyringe';

import IUserData from '@domain/user/data/IUserData';
import UserRepository from '@providers/database/typeorm/user/repositories/UserRepository';

import IVendorData from '@domain/vendor/data/IVendorData';
import VendorRepository from '@providers/database/typeorm/vendor/repositories/VendorRepository';

container.registerSingleton<IUserData>('UserData', UserRepository);
container.registerSingleton<IVendorData>('VendorData', VendorRepository);
