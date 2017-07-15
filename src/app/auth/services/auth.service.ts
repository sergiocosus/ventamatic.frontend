import {EventEmitter, Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Router} from '@angular/router';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Observable} from 'rxjs/Observable';
import {LocalStorageService} from '../../shared/services/local-storage.service';
import {environment} from '../../../environments/environment';
import {UserService} from '../../user/services/user.service';
import {ApiHttp} from '../../shared/services/api-http';
import {User} from '../../user/classes/user';

@Injectable()
export class AuthService {
  private loggedUserReplaySubject = new ReplaySubject<User>(1);
  private loggedUser: User = null;
  private hasLogoutEvent = new EventEmitter;

  constructor(private apiHttp: ApiHttp,
              private http: Http,
              private userService: UserService,
              private localStorage: LocalStorageService,
              private router: Router) {
  }

  login(username, password) {
    return new Observable<User>((subscriber) => {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      const urlSearchParams = new URLSearchParams();
      urlSearchParams.append('grant_type', 'password');
      urlSearchParams.append('client_id', environment.apiClientID);
      urlSearchParams.append('client_secret', environment.apiClientSecret);
      urlSearchParams.append('username', username);
      urlSearchParams.append('password', password);
      const body = urlSearchParams.toString();

      this.http.post(environment.apiUrl + 'oauth/token', body, {headers: headers}).subscribe(
        data => {
          const json = data.json();
          this.localStorage.set('access_token', json.access_token);

          this.updateLoggedUserObservable().subscribe(
            user => {
              subscriber.next(user);
              subscriber.complete();
            }
          );

          // this.router.navigate(['/myaccount', {'first-login': true}]);

        },
        error => {
          //    this.noty.serviceError(error);
          subscriber.error(error);
        }
      );
    });

  }

  logout() {
    this.localStorage.remove('access_token');
    this.updateLoggedUserObservable({logout: true}).subscribe(() => { });
    this.hasLogoutEvent.emit();
  }

  getLoggedUser() {
    if (!this.loggedUser) {
      this.loggedUser = new User();
      this.updateLoggedUserObservable();
    }
    return this.loggedUserReplaySubject;
  }

  hasLogout() {
    return this.hasLogoutEvent.asObservable();
  }

  updateLoggedUserObservable(data = {logout: false}) {
    return new Observable<User>((obs) => {
      if (data.logout) {
        this.loggedUser = null;
        this.loggedUserReplaySubject.next(this.loggedUser);
      } else {
        this.userService.getMe().subscribe(
          user => {
            this.loggedUser = user;
            this.loggedUserReplaySubject.next(this.loggedUser);

            obs.next(user);
            obs.complete();
          },
          error => {
            console.error(error);
            if (error.code === 401) {
              this.loggedUser = null;
              this.loggedUserReplaySubject.next(this.loggedUser);
            }
            // Token expired
            // if (error.code === 1106 || error.code === 1107) {
            //  this.noty.alert(this.messages.sessionExpired);
            //  this.logout();
            // }
            obs.error(error);
            obs.complete();
          }
        );
      }
    });
  }


}
