import 'reflect-metadata';
import FakeUserProvider from '@providers/fake/FakeUserProvider';
import StatusUserUseCase from '@domain/user/useCases/StatusUserUseCase';

let fakeUserProvider: FakeUserProvider;
let statusUserUseCase: StatusUserUseCase;

describe('Change User Status Use Case - unit tests', () => {
  beforeEach(() => {
    fakeUserProvider = new FakeUserProvider();
    statusUserUseCase = new StatusUserUseCase(fakeUserProvider);
  });

  it('should be able to change a user status', async () => {
    const userId = 'id-1';

    const user = await statusUserUseCase.execute(userId);
    expect(user?.id).toBeDefined();
    expect(user?.active).toBe(true);
  });
});
