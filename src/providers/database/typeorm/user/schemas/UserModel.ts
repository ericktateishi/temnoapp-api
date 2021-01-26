import UserEntity from '@domain/user/entities/UserEntity';
import VendorModel from '@providers/database/typeorm/vendor/schemas/VendorModel';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
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
  phone?: string;

  @Column()
  location: string;

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
