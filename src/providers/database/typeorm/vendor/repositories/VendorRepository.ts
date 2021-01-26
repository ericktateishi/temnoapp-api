import { getRepository, Repository } from 'typeorm';
import IVendorData, {
  CreateVendorDTO,
  ListVendorResponse,
} from '@domain/vendor/data/IVendorData';
import VendorModel from '@providers/database/typeorm/vendor/schemas/VendorModel';
import VendorHoursModel from '@providers/database/typeorm/vendor/schemas/VendorHoursModel';

class VendorRepository implements IVendorData {
  private vendorRepository: Repository<VendorModel>;

  private hourRepository: Repository<VendorHoursModel>;

  constructor() {
    this.vendorRepository = getRepository(VendorModel);
    this.hourRepository = getRepository(VendorHoursModel);
  }

  public async create(data: CreateVendorDTO): Promise<VendorModel> {
    let vendorHours: VendorHoursModel | undefined;
    if (data?.hours) {
      vendorHours = this.hourRepository.create({
        ...data?.hours,
      });
      await this.hourRepository.save(vendorHours);
    }

    const vendor = this.vendorRepository.create({
      ...data,
      hours: vendorHours,
      active: true,
    });

    await this.vendorRepository.save(vendor);
    return vendor;
  }

  public async findAll(
    limit: number,
    offset: number,
  ): Promise<ListVendorResponse> {
    const vendors = await this.vendorRepository.find({
      where: {
        active: true,
      },
      order: {
        created: 'DESC',
      },
      take: limit,
      skip: offset,
      relations: ['hours'],
    });

    const total = await this.vendorRepository.count({
      where: {
        active: true,
      },
    });

    return {
      total,
      offset,
      limit,
      vendors,
    };
  }

  public async findById(id: string): Promise<VendorModel | undefined> {
    return this.vendorRepository.findOne(id, {
      relations: ['hours'],
    });
  }
}

export default VendorRepository;
