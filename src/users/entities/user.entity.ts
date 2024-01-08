import { Role } from './role.enum';

export class User {
  email: string;
  password: string;
  role: Role[];
}
