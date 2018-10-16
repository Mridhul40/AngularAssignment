import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {User} from '../models/user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string):Observable<User> {
      return this.http.post<any>(`http://conduit.productionready.io/api/users/login`, {"user":{email:username, password:password} })
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
       
              if (user.user&& user.user.token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  window.localStorage['jwtToken'] = user.user.token;
              }
              return user.user;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('jwtToken');
  }
}