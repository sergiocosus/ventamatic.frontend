import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private $loggedUser = new ReplaySubject<User>(1);
  private $impersonatorUser = new ReplaySubject<User>(1);

  private loggedUser: User;
  private impersonatorUser: User;
  private _requestedRouteWithoutAuth: string;

  set requestedRouteWithoutAuth(value: string) {
    this._requestedRouteWithoutAuth = value === '/login' ? null : value;
  }

  get requestedRouteWithoutAuth(): string {
    return this._requestedRouteWithoutAuth;
  }

  constructor(private localStorageService: LocalStorageService,
              private router: Router) {
  }

  getLoggedUser() {
    return this.$loggedUser.asObservable();
  }

  getImpersonatedUser() {
    return this.$impersonatorUser.asObservable();
  }

  setLoggedUser(user: User) {
    this.$loggedUser.next(user);
    this.loggedUser = user;
    if (!user) {
      this.removeAccessToken();
    }
  }

  setImpersonatorUser(user: User) {
    this.$impersonatorUser.next(user);
    this.impersonatorUser = user;
  }

  setAccessToken(value) {
    this.localStorageService.set('access_token', value);
  }

  removeAccessToken() {
    this.localStorageService.remove('access_token');
  }

  getAccessToken() {
    return this.localStorageService.get('access_token');
  }

  setSessionExpired() {
    this.setLoggedUser(null);
    this.router.navigateByUrl('/login');
    this.requestedRouteWithoutAuth = this.router.url;
    console.log('session expired', this.router.url);
  }
}
