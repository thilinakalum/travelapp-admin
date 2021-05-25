import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AttractionModel} from '../model/attraction.model';
import {Page} from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class AttractionService {

  SERVICE_PATH = 'http://13.92.168.193:9003/';
  // SERVICE_PATH = 'http://localhost:9003/';

  constructor(private http: HttpClient) {
  }

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

  getPageableAttractions(pageNumber: number, pageSize: number): Observable<Page<AttractionModel>> {
    let params = new HttpParams();
    params = params.append('page', pageNumber.toString());
    params = params.append('size', pageSize.toString());
    return this.http.get<Page<AttractionModel>>(this.SERVICE_PATH + 'attractions', {params: params})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
