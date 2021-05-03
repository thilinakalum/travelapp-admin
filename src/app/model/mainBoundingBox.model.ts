import {Injectable} from '@angular/core';
import {BoundingBoxModel} from './boundingBox.model';

@Injectable()
export class MainBoundingBoxModel {
  id: string;
  maxLatitude: string;
  minLatitude: string;
  maxLongitude: string;
  minLongitude: string;
  syncStatus: string;
  boundingBoxes: BoundingBoxModel[];
}
