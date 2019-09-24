import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/index';
import {Router} from '@angular/router';
import { tryCastAndThrowApiError } from '../models/api-error';
import { User } from '../models/user';

export enum AuthenticationStatus {
  NotAuthenticatedYet,
  Authenticated,
  AuthenticationError,
  LoggedOut
}

export class UserAuth {
  constructor(public user: User,
              public authenticationStatus: AuthenticationStatus) {
  }
}

@Injectable()
export class AuthService {
  userAuth = new BehaviorSubject<UserAuth>(new UserAuth(null, AuthenticationStatus.NotAuthenticatedYet));

  constructor(private http: HttpClient,
              private router: Router) {
  }

  public sessionEnded() {
      this.userAuth.next(new UserAuth(null, AuthenticationStatus.AuthenticationError));
      this.router.navigate(['login']);
  }

  public login(sesa?: string, password?: string) {
      let headers;
      if (!!sesa && !!password) {
          headers = new HttpHeaders({
              authorization: 'Basic ' + btoa(sesa + ':' + password)
          });
      }
      return this.http.get('/manage/api/auth/login', {headers: headers, withCredentials: true})
          .pipe(
              map((authUser: User) => {
                  const user = User.deserialize(authUser);
                  this.userAuth.next(new UserAuth(user, AuthenticationStatus.Authenticated));
              }),
              catchError((error) => {
                  this.userAuth.next(new UserAuth(null, AuthenticationStatus.AuthenticationError));
                  tryCastAndThrowApiError(error);
                  throw "Unknown error";
              })
          );
  }

  public logout() {
      return this.http.get('/manage/api/auth/logout', {withCredentials: true}).pipe(
          map(() => this.userAuth.next(new UserAuth(null, AuthenticationStatus.LoggedOut)))
      );
  }

  public isAuthenticated() {
      return this.userAuth.getValue().authenticationStatus === AuthenticationStatus.Authenticated;
  }
}