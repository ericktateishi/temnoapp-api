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

  it('should be able to update a user', async () => {
    const user = {
      id: 'id-1',
      email: 'test@mail.com',
      name: 'test',
      location: 'location-id',
    };

    const userUpdated = await updateUserUseCase.execute(user);
    expect(userUpdated?.id).toBeDefined();
    expect(userUpdated?.email).toBe(user.email);
    expect(userUpdated?.name).toBe(user.name);
    expect(userUpdated?.location).toBe(user.location);
  });
});
