import {Injectable} from '@angular/core';
import {PermissionModel} from './permission.model';

@Injectable()
export class RoleModel {
  id: string;
  name: string;
  permissions: PermissionModel[];
}
