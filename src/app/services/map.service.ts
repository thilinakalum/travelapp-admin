import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {MainBoundingBoxModel} from '../model/mainBoundingBox.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  SERVICE_PATH = 'http://13.92.168.193:9001/';

  constructor(private http: HttpClient) { }

  getAllBoundingBox(): Observable<MainBoundingBoxModel[]> {
    return this.http
      .get(this.SERVICE_PATH + 'mainBoundingBoxes', {headers: null})
      .pipe(map((response) => response as MainBoundingBoxModel[]), catchError(this.handleError));
  }

  handleError(err) {
    if (err instanceof HttpErrorResponse) {
      return throwError(err.message);
    } else {
      return throwError(err);
    }
  }
}
