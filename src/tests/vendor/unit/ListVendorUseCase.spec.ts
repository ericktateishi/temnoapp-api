import 'reflect-metadata';
import ListVendorUseCase from '@domain/vendor/useCases/ListVendorUseCase';
import FakeVendorProvider from '@providers/fake/FakeVendorProvider';

let fakeVendorProvider: FakeVendorProvider;
let listVendorUseCase: ListVendorUseCase;

describe('Lisst Vendor Use Case - unit tests', () => {
  beforeEach(() => {
    fakeVendorProvider = new FakeVendorProvider();
    listVendorUseCase = new ListVendorUseCase(fakeVendorProvider);
  });

  it('should be able to list vendors', async () => {
    const option = {
      limit: 10,
      offset: 0,
    };
    const result = await listVendorUseCase.execute(option);

    expect(result.limit).toBe(option.limit);
    expect(result.offset).toBe(option.offset);
    expect(result.vendors.length).toBeGreaterThan(0);
    expect(result.vendors[0].id).toBeDefined();
  });
});
