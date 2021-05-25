import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {PermissionModel} from '../model/permission.model';
import {RoleModel} from '../model/role.model';
import {UserModel} from '../model/user.model';
import {Page} from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  SERVICE_PATH = 'http://13.92.168.193:9007/';
  // SERVICE_PATH = 'http://localhost:9007/';

  constructor(private http: HttpClient) {
  }

  getAllRoles(): Observable<RoleModel[]> {
    return this.http
      .get(this.SERVICE_PATH + 'users/roles', {headers: null})
      .pipe(map((response) => response as RoleModel[]), catchError(this.handleError));
  }

  getAllPermissions(): Observable<PermissionModel[]> {
    return this.http
      .get(this.SERVICE_PATH + 'users/permission', {headers: null})
      .pipe(map((response) => response as PermissionModel[]), catchError(this.handleError));
  }

  saveUser(user: UserModel): Observable<UserModel> {
    return this.http
      .post(this.SERVICE_PATH + 'users/signup', user, {
        headers: null,
      })
      .pipe(map((response) => response as UserModel), catchError(this.handleError));
  }

  updateUser(user: UserModel): Observable<UserModel> {
    return this.http
      .put(this.SERVICE_PATH + 'users/' + user.id, user, {
        headers: null,
      })
      .pipe(map((response) => response as UserModel), catchError(this.handleError));
  }

  saveRole(role: RoleModel): Observable<RoleModel> {
    return this.http
      .post(this.SERVICE_PATH + 'roles', role, {
        headers: null,
      })
      .pipe(map((response) => response as RoleModel), catchError(this.handleError));
  }

  savePermission(permission: PermissionModel): Observable<PermissionModel> {
    return this.http
      .post(this.SERVICE_PATH + 'permission', permission, {
        headers: null,
      })
      .pipe(map((response) => response as PermissionModel), catchError(this.handleError));
  }

  getPageableUsers(pageNumber: number, pageSize: number): Observable<Page<UserModel>> {
    let params = new HttpParams();
    params = params.append('page', pageNumber.toString());
    params = params.append('size', pageSize.toString());
    return this.http.get<Page<UserModel>>(this.SERVICE_PATH + 'users', {params: params})
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
