import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {CityModel} from '../model/city.model';
import {CountryModel} from '../model/country.model';
import {StateModel} from '../model/state.model';
import {InterestModel} from '../model/interest.model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  SERVICE_PATH = 'http://13.92.168.193:9000/';

  constructor(private http: HttpClient) { }

  getAllCities(): Observable<CityModel[]> {
    return this.http
      .get(this.SERVICE_PATH + 'cities', {headers: null})
      .pipe(map((response) => response as CityModel[]), catchError(this.handleError));
  }

  saveCity(city: CityModel): Observable<CityModel> {
    return this.http
      .post(this.SERVICE_PATH + 'cities', city, {
        headers: null,
      })
      .pipe(map((response) => response as CityModel), catchError(this.handleError));
  }

  getAllCountries(): Observable<CountryModel[]> {
    return this.http
      .get(this.SERVICE_PATH + 'countries', {headers: null})
      .pipe(map((response) => response as CountryModel[]), catchError(this.handleError));
  }

  saveCountry(city: CityModel): Observable<CountryModel> {
    return this.http
      .post(this.SERVICE_PATH + 'countries', city, {
        headers: null,
      })
      .pipe(map((response) => response as CountryModel), catchError(this.handleError));
  }

  getAllStates(): Observable<StateModel[]> {
    return this.http
      .get(this.SERVICE_PATH + 'states', {headers: null})
      .pipe(map((response) => response as StateModel[]), catchError(this.handleError));
  }

  saveState(state: StateModel): Observable<StateModel> {
    return this.http
      .post(this.SERVICE_PATH + 'states', state, {
        headers: null,
      })
      .pipe(map((response) => response as StateModel), catchError(this.handleError));
  }

  getAllInterests(): Observable<InterestModel[]> {
    return this.http
      .get(this.SERVICE_PATH + 'interests', {headers: null})
      .pipe(map((response) => response as InterestModel[]), catchError(this.handleError));
  }

  saveInterest(interestModel: InterestModel): Observable<InterestModel> {
    return this.http
      .post(this.SERVICE_PATH + 'interests', interestModel, {
        headers: null,
      })
      .pipe(map((response) => response as InterestModel), catchError(this.handleError));
  }

  handleError(err) {
    if (err instanceof HttpErrorResponse) {
      return throwError(err.message);
    } else {
      return throwError(err);
    }
  }
}
