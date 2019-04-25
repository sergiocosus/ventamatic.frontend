import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { SessionService } from './session.service';
import { UserService } from '../services/user.service';
import { API_CONFIG, ApiConfig } from '../types/api-config';
import { User } from '@app/api/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logoutRoute = '/';
  loginRoute = '/';

  constructor(@Inject(API_CONFIG) private config: ApiConfig,
              @Inject(PLATFORM_ID) private platformId: Object,
              private http: HttpClient,
              private router: Router,
              private userService: UserService,
              private sessionService: SessionService) {
    this.updateLoggedUserObservable().subscribe();
  }


  login(email: string, password: string) {
    const urlSearchParams = new HttpParams()
      .append('grant_type', 'password')
      .append('client_id', this.config.apiClientID)
      .append('client_secret', this.config.apiClientSecret)
      .append('username', email)
      .append('password', password);
    const body = urlSearchParams.toString();

    return this.loginOAuth(body);
  }

  private loginOAuth(body: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post('oauth/token', body, {headers: headers}).pipe(
      mergeMap((data: any) => {
          this.sessionService.setAccessToken(data.access_token);
          return this.updateLoggedUserObservable();
        }
      ));
  }

  logout() {
    this.http.get('auth/logout').subscribe();

    this.sessionService.removeAccessToken();
    this.updateLoggedUserObservable({logout: true}).subscribe();
  }

  register(data: {
    email: string;
    password: string;
    password_confirmation: string;
    name: string;
    team_slug: string;
  }) {
    return this.http.post('auth/register', data).pipe(mergeMap(
      user => this.login(data.email, data.password)
    ));
  }


  updateLoggedUserObservable(data = {logout: false}) {
    return new Observable<User>((obs) => {
      if (data.logout) {
        this.sessionService.setLoggedUser(null);

        this.router.navigateByUrl(this.logoutRoute);
      } else {
        if (isPlatformServer(this.platformId)) {
          return;
        }

        this.userService.getMe().subscribe(
          sessionData => {
            console.log(sessionData);
            const user = sessionData.user;
            this.sessionService.setLoggedUser(user);
            this.sessionService.setImpersonatorUser(sessionData.impersonator_user);

            obs.next(user);
            obs.complete();
          },
          error => {
            console.error(error);
            this.sessionService.setLoggedUser(null);
            obs.error(error);
            obs.complete();
          }
        );
      }
    });
  }

  passwordReset(data: {
    token: string,
    password: string,
    password_confirmation: string,
    email: string,
  }) {
    return this.http.post('auth/password/reset', data);
  }

  redirectRouteAfterLogin() {
    if (this.sessionService.requestedRouteWithoutAuth) {
      this.router.navigateByUrl(this.sessionService.requestedRouteWithoutAuth);
      this.sessionService.requestedRouteWithoutAuth = null;
    } else {
      this.router.navigateByUrl(this.loginRoute);
    }
  }

  requestPasswordReset(email) {
    return this.http.post('auth/password/email', {email: email});
  }


  /**
   * Social auth
   */
  private socialAuthParams(driver, access_token, redirect_url) {
    const urlSearchParams = new HttpParams()
      .append('network', driver)
      .append('access_token', access_token)
      .append('grant_type', 'social')
      .append('client_id', this.config.apiClientID)
      .append('client_secret', this.config.apiClientSecret)
      .append('redirect_url', redirect_url);
    const body = urlSearchParams.toString();
    return body;
  }

  loginWithSocialCode(driver, access_token, redirect_url) {
    const body = this.socialAuthParams(driver, access_token, redirect_url);

    return this.loginOAuth(body);
  }

  getSocialRedirectUrl(driver, redirect_url?: string) {
    return this.http.get('auth/social',
      {params: {driver, redirect_url}}
    ).pipe(map(data => data['redirect_url']));
  }
}
