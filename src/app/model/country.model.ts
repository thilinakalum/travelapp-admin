import {Injectable} from '@angular/core';

@Injectable()
export class CountryModel {
  id: string;
  name: string;
  hashTag: string;
  description: string;
  status: string;
}
