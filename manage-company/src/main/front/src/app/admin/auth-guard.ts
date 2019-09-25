import { RouterStateSnapshot, ActivatedRouteSnapshot, Router } from "@angular/router";
import { AuthenticationStatus, AccountAuth, AuthService } from "./auth.service";
import {Injectable} from '@angular/core';
import { Observable } from "rxjs/index";

@Injectable()
export class AuthGuard {
    constructor(private authService: AuthService,
        private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isAuthenticated()) {
            return true;
        }
        const auth = this.authService.accountAuth.getValue();

        switch (auth.authenticationStatus) {
            case AuthenticationStatus.Authenticated:
                return true;
            case AuthenticationStatus.AuthenticationError:
                this.navigateToLogin(state);
                return false;
            case AuthenticationStatus.NotAuthenticatedYet:
            default:
                break;
        }

        return new Promise(
            (resolve => {
                this.authService.accountAuth.subscribe(
                    (AccountAuth: AccountAuth) => {
                        switch (AccountAuth.authenticationStatus) {
                            case AuthenticationStatus.Authenticated:
                                resolve(true);
                                break;
                            case AuthenticationStatus.AuthenticationError:
                            case AuthenticationStatus.LoggedOut:
                            case AuthenticationStatus.NotAuthenticatedYet:
                                this.navigateToLogin(state);
                                resolve(false);
                                break;
                            default:
                                break;
                        }
                    }
                );
            })
        );
    }

    private navigateToLogin(state: RouterStateSnapshot) {
        const navigationOptions = {};
        if (state.url !== '/') {
            navigationOptions['queryParams'] = { 'redirect': encodeURIComponent(state.url) };
        }
        this.router.navigate(['/admin/login'], navigationOptions);
    }
}
