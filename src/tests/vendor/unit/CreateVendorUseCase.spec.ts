import 'reflect-metadata';
import FakeVendorProvider from '@providers/fake/FakeVendorProvider';
import CreateVendorUseCase from '@domain/vendor/useCases/CreateVendorUseCase';

let fakeVendorProvider: FakeVendorProvider;
let createVendorUseCase: CreateVendorUseCase;

describe('Create Vendor Use Case - unit tests', () => {
  beforeEach(() => {
    fakeVendorProvider = new FakeVendorProvider();
    createVendorUseCase = new CreateVendorUseCase(fakeVendorProvider);
  });

  it('should be able to create a vendor', async () => {
    const vendor = {
      user: 'user-id',
      location: 'location-id',
      name: 'Test',
      phone: '00 0000 0000',
      category: 'category-id',
      description: 'test',
      hours: {
        monday: '00h00 - 00h00',
        tuesday: '00h00 - 00h00',
        wednesday: '00h00 - 00h00',
        thursday: '00h00 - 00h00',
        friday: '00h00 - 00h00',
      },
    };

    const { id, name, phone } = await createVendorUseCase.execute(vendor);
    expect(id).toBeDefined();
    expect(name).toBe(vendor.name);
    expect(phone).toBe(vendor.phone);
  });
});
