import VendorEntity from '@domain/vendor/entities/VendorEntity';
import VendorHoursModel from '@providers/database/typeorm/vendor/schemas/VendorHoursModel';
import UserModel from '@providers/database/typeorm/user/schemas/UserModel';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('vendor')
class VendorModel extends VendorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserModel, { nullable: false })
  user: string;

  @Column({ nullable: false })
  name: string;

  @Column()
  phone: string;

  @Column()
  location: string;

  @Column()
  description?: string;

  @Column()
  category?: string;

  @OneToOne(() => VendorHoursModel)
  @JoinColumn()
  hours: VendorHoursModel;

  @Column()
  facebook?: string;

  @Column()
  instagram?: string;

  @Column()
  twitter?: string;

  @Column({ nullable: false })
  active: boolean;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}

export default VendorModel;
