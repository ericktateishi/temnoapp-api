import LocationEntity from '@domain/location/entities/LocationEntity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';

@Entity('location')
class LocationModel extends LocationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  @Index({ unique: true })
  name: string;

  @Column()
  address: string;

  @Column()
  addressComplement?: string;

  @Column()
  neighbourhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  postalCode: string;

  @Column('double')
  lng?: number;

  @Column('double')
  lat?: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}

export default LocationModel;
