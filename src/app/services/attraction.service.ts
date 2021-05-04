import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {CityModel} from '../model/city.model';
import {CountryModel} from '../model/country.model';
import {StateModel} from '../model/state.model';
import {InterestModel} from '../model/interest.model';
import {AttractionModel} from '../model/attraction.model';

@Injectable({
  providedIn: 'root'
})
export class AttractionService {

  SERVICE_PATH = 'http://13.92.168.193:9003/';
  // SERVICE_PATH = 'http://localhost:9003/';

  constructor(private http: HttpClient) { }

  getAllAttractions(): Observable<AttractionModel[]> {
    return this.http
      .get(this.SERVICE_PATH + 'attractions', {headers: null})
      .pipe(map((response) => response as AttractionModel[]), catchError(this.handleError));
  }

  saveAttraction(attraction: AttractionModel): Observable<AttractionModel> {
    console.log(attraction);
    return this.http
      .post(this.SERVICE_PATH + 'attractions', attraction, {
        headers: null,
      })
      .pipe(map((response) => response as AttractionModel), catchError(this.handleError));
  }

  handleError(err) {
    if (err instanceof HttpErrorResponse) {
      return throwError(err.message);
    } else {
      return throwError(err);
    }
  }
}
