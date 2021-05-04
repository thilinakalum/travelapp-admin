import {Injectable} from '@angular/core';
import {CoordinatesModel} from './coordinates.model';

@Injectable()
export class AttractionModel {
  id: string;
  name: string;
  hashTag: string;
  description: string;
  tags: string;
  interestTags: string;
  informationLevel: string;
  overview: string;
  coverImage: string;
  reactions: string;
  coordinates: CoordinatesModel;
  status: string;
  version: string;
}
