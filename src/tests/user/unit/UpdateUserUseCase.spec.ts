import 'reflect-metadata';
import FakeUserProvider from '@providers/fake/FakeUserProvider';
import FakeAuthProvider from '@providers/fake/FakeAuthProvider';
import UpdateUserUseCase from '@domain/user/useCases/UpdateUserUseCase';

let fakeUserProvider: FakeUserProvider;
let fakeAuthProvider: FakeAuthProvider;
let updateUserUseCase: UpdateUserUseCase;

describe('Update User Use Case - unit tests', () => {
  beforeEach(() => {
    fakeUserProvider = new FakeUserProvider();
    fakeAuthProvider = new FakeAuthProvider();
    updateUserUseCase = new UpdateUserUseCase(
      fakeUserProvider,
      fakeAuthProvider,
    );
  });

  it('should NOT be able to update a invalid user password', async () => {
    const user = {
      id: 'id-invalid',
      email: 'test@mail.com',
      name: 'test',
      password: 'secret-2',
      oldPassword: 'secret',
    };

    const userUpdated = await updateUserUseCase.execute(user);
    expect(userUpdated).toBeUndefined();
  });

  it('should NOT be able to update a user wrong old password', async () => {
    const user = {
      id: 'id-1',
      email: 'test@mail.com',
      name: 'test',
      password: 'secret-2',
      oldPassword: 'wrong',
    };

    try {
      await updateUserUseCase.execute(user);
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should NOT be able to create a password if user doesnt have it', async () => {
    const user = {
      id: 'id-2',
      email: 'test@mail.com',
      name: 'test',
      password: 'secret-2',
      oldPassword: 'secret',
    };

    try {
      await updateUserUseCase.execute(user);
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should be able to update a user password', async () => {
    const user = {
      id: 'id-1',
      email: 'test@mail.com',
      name: 'test',
      password: 'secret-2',
      oldPassword: 'secret',
    };

    const userUpdated = await updateUserUseCase.execute(user);
    expect(userUpdated?.id).toBeDefined();
  });

  it('should be able to update a user', async () => {
    const user = {
      id: 'id-1',
      email: 'test@mail.com',
      name: 'test',
    };

    const userUpdated = await updateUserUseCase.execute(user);
    expect(userUpdated?.id).toBeDefined();
    expect(userUpdated?.email).toBe(user.email);
    expect(userUpdated?.name).toBe(user.name);
  });
});
