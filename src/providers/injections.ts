import { container } from 'tsyringe';

import IUserData from '@domain/user/data/IUserData';
import UserRepository from '@providers/database/typeorm/user/repositories/UserRepository';
import FakeUserProvider from '@providers/fake/FakeUserProvider';

import IVendorData from '@domain/vendor/data/IVendorData';
import VendorRepository from '@providers/database/typeorm/vendor/repositories/VendorRepository';
import FakeVendorProvider from '@providers/fake/FakeVendorProvider';

import IAuthData from '@domain/auth/data/IAuthData';
import AuthProvider from '@providers/auth/AuthProvider';
import FakeAuthProvider from '@providers/fake/FakeAuthProvider';

import ILocationData from '@domain/location/data/ILocationData';
import LocationRepository from '@providers/database/typeorm/location/repositories/LocationRepository';

import ICategoryData from '@domain/category/data/ICategoryData';
import CategoryRepository from '@providers/database/typeorm/category/repositories/CategoryRepository';

container.registerSingleton<IUserData>(
  'UserData',
  process.env.NODE_ENV !== 'test' ? UserRepository : FakeUserProvider,
);
container.registerSingleton<IVendorData>(
  'VendorData',
  process.env.NODE_ENV !== 'test' ? VendorRepository : FakeVendorProvider,
);
container.registerSingleton<IAuthData>(
  'AuthData',
  process.env.NODE_ENV !== 'test' ? AuthProvider : FakeAuthProvider,
);

container.registerSingleton<ILocationData>('LocationData', LocationRepository);

container.registerSingleton<ICategoryData>('CategoryData', CategoryRepository);
