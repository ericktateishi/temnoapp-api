import UserEntity from '@domain/user/entities/UserEntity';
import VendorModel from '@providers/database/typeorm/vendor/schemas/VendorModel';
import LocationModel from '@providers/database/typeorm/location/schemas/LocationModel';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity('user')
class UserModel extends UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  @Index({ unique: true })
  email: string;

  @Column()
  password?: string;

  @Column()
  phone?: string;

  @ManyToOne(() => LocationModel)
  location: LocationModel;

  @OneToMany(() => VendorModel, vendor => vendor.user)
  vendors: VendorModel[];

  @Column({ nullable: false })
  active: boolean;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}

export default UserModel;
