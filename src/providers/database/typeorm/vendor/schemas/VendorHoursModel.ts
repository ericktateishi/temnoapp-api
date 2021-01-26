import VendorHoursEntity from '@domain/vendor/entities/VendorHoursEntity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vendorHours')
class VendorHoursModel extends VendorHoursEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sunday?: string;

  @Column()
  monday?: string;

  @Column()
  tuesday?: string;

  @Column()
  wednesday?: string;

  @Column()
  thursday?: string;

  @Column()
  friday?: string;

  @Column()
  saturday?: string;
}

export default VendorHoursModel;
