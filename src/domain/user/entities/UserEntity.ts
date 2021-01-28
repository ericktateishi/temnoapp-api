export default class UserEntity {
  id: string;

  name: string;

  email: string;

  phone?: string;

  location: string;

  password?: string;

  active: boolean;

  created: Date;

  updated: Date;
}
