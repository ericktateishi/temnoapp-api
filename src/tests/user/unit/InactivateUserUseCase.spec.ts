import 'reflect-metadata';
import FakeUserProvider from '@providers/fake/FakeUserProvider';
import InactivateUserUseCase from '@domain/user/useCases/InactivateUserUseCase';

let fakeUserProvider: FakeUserProvider;
let inactivateUserUseCase: InactivateUserUseCase;

describe('Inactivate User Use Case - unit tests', () => {
  beforeEach(() => {
    fakeUserProvider = new FakeUserProvider();
    inactivateUserUseCase = new InactivateUserUseCase(fakeUserProvider);
  });

  it('should be able to change a user status', async () => {
    const userId = 'id-1';

    const user = await inactivateUserUseCase.execute(userId);
    expect(user?.id).toBeDefined();
    expect(user?.active).toBe(false);
  });
});
