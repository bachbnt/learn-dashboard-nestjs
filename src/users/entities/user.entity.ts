import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Role } from './role.enum';
import { ObjectId } from 'mongodb';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: string | ObjectId;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column()
  role: Role[];
}
