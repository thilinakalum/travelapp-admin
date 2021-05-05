import {Injectable} from '@angular/core';
import {CoordinatesModel} from './coordinates.model';

@Injectable()
export class Page<T> {
  content: Array<T>;
  totalElements:  number;
  totalPages:  number;
  last: boolean;
  number: number;
  size: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
  };
}
