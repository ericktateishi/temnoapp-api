import { getRepository, IsNull, Repository } from 'typeorm';
import ICategoryData, {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from '@domain/category/data/ICategoryData';
import CategoryModel from '@providers/database/typeorm/category/schemas/CategoryModel';

class CategoryRepository implements ICategoryData {
  private ormRepository: Repository<CategoryModel>;

  constructor() {
    this.ormRepository = getRepository(CategoryModel);
  }

  public async create(data: CreateCategoryDTO): Promise<CategoryModel> {
    const category = this.ormRepository.create({
      ...data,
      id: undefined,
    });

    await this.ormRepository.save(category);
    return category;
  }

  public async update(
    data: UpdateCategoryDTO,
  ): Promise<CategoryModel | undefined> {
    const { id } = data;
    await this.ormRepository.update(
      {
        id,
      },
      {
        ...data,
      },
    );
    return this.ormRepository.findOne({
      where: { id },
      relations: ['parentCategory'],
    });
  }

  public async findAll(parent: string, all: boolean): Promise<CategoryModel[]> {
    const where = parent
      ? { parentCategoryId: parent }
      : { parentCategoryId: IsNull() };

    return this.ormRepository.find({
      where: all ? {} : where,
      relations: ['parentCategory'],
    });
  }

  public async findById(id: string): Promise<CategoryModel | undefined> {
    return this.ormRepository.findOne({
      where: { id },
      relations: ['parentCategory'],
    });
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.ormRepository.delete(id);
    return (result.affected || 0) === 1;
  }
}

export default CategoryRepository;
