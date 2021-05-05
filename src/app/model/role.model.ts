import {Injectable} from '@angular/core';
import {CoordinatesModel} from './coordinates.model';
import {PermissionModel} from './permission.model';

@Injectable()
export class RoleModel {
  id: string;
  name: string;
  permissions: PermissionModel[];
}
