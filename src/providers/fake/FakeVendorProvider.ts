import IVendorData, {
  CreateVendorDTO,
  UpdateVendorDTO,
  ListVendorResponse,
} from '@domain/vendor/data/IVendorData';
import VendorEntity from '@domain/vendor/entities/VendorEntity';

class FakeVendorProvider implements IVendorData {
  private vendors: VendorEntity[] = [
    {
      id: 'id-1',
      userId: 'user-id',
      name: 'Test',
      phone: '00 0000 0000',
      category: 'category-id',
      description: 'test',
      hours: {
        id: 'hours-id',
        monday: '00h00 - 00h00',
        tuesday: '00h00 - 00h00',
        wednesday: '00h00 - 00h00',
        thursday: '00h00 - 00h00',
        friday: '00h00 - 00h00',
      },
      active: true,
      created: new Date(),
      updated: new Date(),
    },
  ];

  public async create(data: CreateVendorDTO): Promise<VendorEntity> {
    const vendor = {
      ...data,
      id: 'id-2',
      active: true,
      created: new Date(),
      updated: new Date(),
    };

    this.vendors.push(vendor);
    return vendor;
  }

  public async update(
    data: UpdateVendorDTO,
  ): Promise<VendorEntity | undefined> {
    const user = this.vendors.find(u => u.id === data.id);
    if (!user) return undefined;

    const newVendor: VendorEntity = {
      ...user,
      ...data,
    };
    this.vendors.map(u => {
      if (u.id === data.id) return newVendor;
      return u;
    });

    return newVendor;
  }

  public async status(id: string): Promise<VendorEntity | undefined> {
    const vendor = this.vendors.find(u => u.id === id);
    if (!vendor) return undefined;

    const newVendor: VendorEntity = {
      ...vendor,
      active: !vendor.active,
    };
    this.vendors.map(u => {
      if (u.id === id) return newVendor;
      return u;
    });

    return newVendor;
  }

  public async findAll(limit = 10, offset = 0): Promise<ListVendorResponse> {
    return {
      limit,
      offset,
      total: this.vendors.length,
      vendors: this.vendors,
    };
  }

  public async findById(id: string): Promise<VendorEntity | undefined> {
    return this.vendors.find(u => u.id === id);
  }
}

export default FakeVendorProvider;
