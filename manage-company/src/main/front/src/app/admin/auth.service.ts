import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/index';
import {Router} from '@angular/router';
import { tryCastAndThrowApiError } from '../models/api-error';
import { Account } from '../models/Account';


export enum AuthenticationStatus {
  NotAuthenticatedYet,
  Authenticated,
  AuthenticationError,
  LoggedOut
}

export class AccountAuth {
  constructor(public account: Account,
              public authenticationStatus: AuthenticationStatus) {
  }
}

@Injectable()
export class AuthService {
  accountAuth = new BehaviorSubject<AccountAuth>(new AccountAuth(null, AuthenticationStatus.NotAuthenticatedYet));

  constructor(private http: HttpClient,
              private router: Router) {
  }

  public sessionEnded() {
      this.accountAuth.next(new AccountAuth(null, AuthenticationStatus.AuthenticationError));
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
              map((authAccount: Account) => {
                  const account = Account.deserialize(authAccount);
                  this.accountAuth.next(new AccountAuth(account, AuthenticationStatus.Authenticated));
              }),
              catchError((error) => {
                  this.accountAuth.next(new AccountAuth(null, AuthenticationStatus.AuthenticationError));
                  tryCastAndThrowApiError(error);
                  throw "Unknown error";
              })
          );
  }

  public logout() {
      return this.http.get('/manage/api/auth/logout', {withCredentials: true}).pipe(
          map(() => this.accountAuth.next(new AccountAuth(null, AuthenticationStatus.LoggedOut)))
      );
  }

  public isAuthenticated() {
      return this.accountAuth.getValue().authenticationStatus === AuthenticationStatus.Authenticated;
  }
}