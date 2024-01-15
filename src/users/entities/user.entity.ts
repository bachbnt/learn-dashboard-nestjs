import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Role } from './role.enum';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column()
  role: Role[];
}
