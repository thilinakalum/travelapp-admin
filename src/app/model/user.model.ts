import {Injectable} from '@angular/core';
import {RoleModel} from './role.model';

@Injectable()
export class UserModel {
  id: string;
  username: string;
  password: string;
  image: string;
  email: string;
  enabled: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  accountNonLocked: boolean;
  roles: RoleModel;
  totalPages: number;
}
