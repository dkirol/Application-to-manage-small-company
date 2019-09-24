import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { ApiError } from '../../models/api-error';
import {AuthService} from "../auth.service";

enum SignInStatus {
  BeforeSignIn,
  SigningIn,
  Error
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  SignInStatus = SignInStatus;
  status = SignInStatus.BeforeSignIn;
  error: string;
  redirectUrl: string;

  constructor(private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const redirectUrlEncoded = this.activatedRoute.snapshot.queryParams['redirect'];
    if (redirectUrlEncoded) {
      this.redirectUrl = decodeURIComponent(redirectUrlEncoded);
    } else {
      this.redirectUrl = '';
    }
    this.loginForm = new FormGroup(
      {
        'login': new FormControl(null, [Validators.required]),
        'password': new FormControl(null, [Validators.required])
      }
    );
  }

  public onLogin() {
    if (this.status === SignInStatus.SigningIn) {
      return;
    }
    if (!this.loginForm.valid) {
      this.loginForm.get('login').markAsTouched();
      this.loginForm.get('password').markAsTouched();
      return;
    }
    this.status = SignInStatus.SigningIn;
    const login = this.loginForm.value['login'];
    const password = this.loginForm.value['password'].trim();
    this.authService.login(login, password).subscribe(
      () => {
        this.onLoginSuccess();
      },
      (error => {
        if (error instanceof ApiError) {
          this.error = error.message;
        } else {
          this.error = error;
        }
        this.status = SignInStatus.Error;
      })
    );
  }

  private onLoginSuccess() {
    if (this.redirectUrl) {
      const splitResult = this.redirectUrl.split('?');
      const urlArray = splitResult[0].split('/').slice(1);
      const regex = /([^,\&]+)/g;
      const params = {};
      if (splitResult.length > 1) {
        const paramsString = splitResult[1];
        const paramsGroup = paramsString.match(regex);
        paramsGroup.forEach(p => {
          const singleParams = p.split('=');
          params[singleParams[0]] = singleParams[1];
        });
      }
      this.router.navigate(['/', ...urlArray], { queryParams: params });
    } else {
      this.router.navigate(['/']);
    }
  }

  public loginError() {
    if (!this.loginForm.get('login').touched || this.loginForm.get('login').valid) {
      return '';
    }
    if (this.loginForm.get('login').errors['required']) {
      return 'Login is required';
    }
    return '';
  }

  public passwordError() {
    if (!this.loginForm.get('password').touched || this.loginForm.get('password').valid) {
      return '';
    }
    if (this.loginForm.get('password').errors['required']) {
      return 'Password is required';
    }
    return '';
  }



}
