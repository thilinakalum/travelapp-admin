import {Injectable} from '@angular/core';

@Injectable()
export class BoundingBoxModel {
  id: string;
  left: string;
  top: string;
  right: string;
  bottom: string;
  mainBoundingBoxId: string;
  syncStatus: string;
}
