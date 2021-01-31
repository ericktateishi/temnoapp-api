import 'reflect-metadata';
import FakeUserProvider from '@providers/fake/FakeUserProvider';
import FakeAuthProvider from '@providers/fake/FakeAuthProvider';
import CreateUserUseCase from '@domain/user/useCases/CreateUserUseCase';

let fakeUserProvider: FakeUserProvider;
let fakeAuthProvider: FakeAuthProvider;
let createUserUseCase: CreateUserUseCase;

describe('Create User Use Case - unit tests', () => {
  beforeEach(() => {
    fakeUserProvider = new FakeUserProvider();
    fakeAuthProvider = new FakeAuthProvider();
    createUserUseCase = new CreateUserUseCase(
      fakeUserProvider,
      fakeAuthProvider,
    );
  });

  it('should be able to create a user without a password', async () => {
    const user = {
      email: 'test@mail.com',
      name: 'test',
    };

    const { id, email, name } = await createUserUseCase.execute(user);
    expect(id).toBeDefined();
    expect(email).toBe(user.email);
    expect(name).toBe(user.name);
  });

  it('should be able to create a user', async () => {
    const user = {
      email: 'test@mail.com',
      name: 'test',
      password: 'secret',
    };

    const { id, email, name } = await createUserUseCase.execute(user);
    expect(id).toBeDefined();
    expect(email).toBe(user.email);
    expect(name).toBe(user.name);
  });
});
