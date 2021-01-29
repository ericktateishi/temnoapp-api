import 'reflect-metadata';
import ShowVendorUseCase from '@domain/vendor/useCases/ShowVendorUseCase';
import FakeVendorProvider from '@providers/fake/FakeVendorProvider';

let fakeVendorProvider: FakeVendorProvider;
let showVendorUseCase: ShowVendorUseCase;

describe('Show Vendor Use Case - unit tests', () => {
  beforeEach(() => {
    fakeVendorProvider = new FakeVendorProvider();
    showVendorUseCase = new ShowVendorUseCase(fakeVendorProvider);
  });

  it('should be able to show a vendor by id', async () => {
    const id = 'id-1';
    const vendor = await showVendorUseCase.execute(id);

    expect(vendor?.id).toBe(id);
  });
});
