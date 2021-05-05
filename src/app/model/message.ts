import {Injectable} from '@angular/core';
import {CoordinatesModel} from './coordinates.model';
import {RoleModel} from './role.model';
import {UserModel} from './user.model';

@Injectable()
export class Message {
  customers: UserModel[];
  totalPages: number;
  pageNumber: number;
  pageSize: number;
}
