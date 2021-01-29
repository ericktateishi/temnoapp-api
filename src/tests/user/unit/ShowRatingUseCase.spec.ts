import 'reflect-metadata';
import ShowUserUseCase from '@domain/user/useCases/ShowUserUseCase';
import FakeUserProvider from '@providers/fake/FakeUserProvider';

let fakeUserProvider: FakeUserProvider;
let showUserUseCase: ShowUserUseCase;

describe('Show User Use Case - unit tests', () => {
  beforeEach(() => {
    fakeUserProvider = new FakeUserProvider();
    showUserUseCase = new ShowUserUseCase(fakeUserProvider);
  });

  it('should be able to show a user by email', async () => {
    const email = 'mail@test.com';
    const user = await showUserUseCase.execute(email);

    expect(user?.id).toBeDefined();
    expect(user?.email).toBe(email);
  });
});
