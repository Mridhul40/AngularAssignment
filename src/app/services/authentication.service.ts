import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../models/user.model';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';
import { map ,  distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject = new BehaviorSubject<User>({} as User);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(username: string, password: string):Observable<User> {
      return this.http.post<any>(`http://conduit.productionready.io/api/users/login`, {"user":{email:username, password:password} })
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
       
              if (user.user&& user.user.token) {
                  window.localStorage['jwtToken'] = user.user.token;
                  this.currentUserSubject.next(user.user);
                  this.isAuthenticatedSubject.next(true);
        
              }
              return user.user;
          }));
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('jwtToken');
  }
}