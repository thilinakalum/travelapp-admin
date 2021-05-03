import {Injectable} from '@angular/core';

@Injectable()
export class InterestModel {
  id: string;
  name: string;
  hashTag: string;
  tags: string;
  pricePerPerson: string;
  description: string;
  status: string;
}
