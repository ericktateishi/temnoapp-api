import CategoryEntity from '@domain/category/entities/CategoryEntity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('category')
class CategoryModel extends CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  @Index({ unique: true })
  name: string;

  @Column({ nullable: true })
  parentCategoryId?: string;

  @ManyToOne(() => CategoryModel, category => category.id)
  @JoinColumn({ name: 'parentCategoryId' })
  parentCategory?: CategoryModel;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}

export default CategoryModel;
