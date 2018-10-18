import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, distinctUntilChanged, catchError } from 'rxjs/operators';
import {User} from '../models/user.model';
import {Observable, BehaviorSubject, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  constructor(private http: HttpClient) { }

  login(username: string, password: string):Observable<User> {
      return this.http.post<any>(`http://conduit.productionready.io/api/users/login`, {"user":{email:username, password:password} })
          .pipe(map(user => {
              // login successful if there's a jwt token in the response

              if (user.user&& user.user.token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  window.localStorage['jwtToken'] = user.user.token;
                  this.currentUserSubject.next(user);
              }
              return user.user;
          }));
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  update(user): Observable<User> {
    console.log(this.currentUserSubject.value.user.token);
    const headersConfig = {
      headers: new HttpHeaders({  'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization' : `Token ${this.currentUserSubject.value.user.token}`})
    };

    return this.http.put(
      `http://conduit.productionready.io/api/user`,
      JSON.stringify(user), headersConfig
    ).pipe(catchError(err => { return throwError(err.error)}))
    .pipe(map(data => {
      this.currentUserSubject.next(user);
      return user;
    }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('jwtToken');
  }
}
