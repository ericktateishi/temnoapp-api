import 'reflect-metadata';
import FakeUserProvider from '@providers/fake/FakeUserProvider';
import ActivateUserUseCase from '@domain/user/useCases/ActivateUserUseCase';

let fakeUserProvider: FakeUserProvider;
let activateUserUseCase: ActivateUserUseCase;

describe('Activate User Use Case - unit tests', () => {
  beforeEach(() => {
    fakeUserProvider = new FakeUserProvider();
    activateUserUseCase = new ActivateUserUseCase(fakeUserProvider);
  });

  it('should be able to change a user status', async () => {
    const userId = 'id-1';

    const user = await activateUserUseCase.execute(userId);
    expect(user?.id).toBeDefined();
    expect(user?.active).toBe(true);
  });
});
