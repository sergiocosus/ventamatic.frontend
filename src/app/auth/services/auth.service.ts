import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { environment } from '../../../environments/environment';
import { UserService } from '../../user/services/user.service';
import { ApiHttp } from '../../shared/services/api-http';
import { User } from '../../user/classes/user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class AuthService {
  private loggedUserReplaySubject = new ReplaySubject<User>(1);
  private loggedUser: User = null;
  private hasLogoutEvent = new EventEmitter;

  constructor(private apiHttp: ApiHttp,
              private http: HttpClient,
              private userService: UserService,
              private localStorage: LocalStorageService,
              private router: Router) {
  }

  login(username, password) {
    return new Observable<User>((subscriber) => {
      const headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');

      const urlSearchParams = new HttpParams()
        .append('grant_type', 'password')
        .append('client_id', environment.apiClientID)
        .append('client_secret', environment.apiClientSecret)
        .append('username', username)
        .append('password', password);
      const body = urlSearchParams.toString();

      this.http.post(environment.apiUrl + 'oauth/token', body, {headers}).subscribe(
        data => {
          this.localStorage.set('access_token', data['access_token']);

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
    this.updateLoggedUserObservable({logout: true}).subscribe(() => {
    });
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
            console.error(error.error);
            if (error.error.code === 401) {
              this.loggedUser = null;
              this.loggedUserReplaySubject.next(this.loggedUser);
            }
            // Token expired
            // if (error.code === 1106 || error.code === 1107) {
            //  this.noty.alert(this.messages.sessionExpired);
            //  this.logout();
            // }
            obs.error(error.error);
            obs.complete();
          }
        );
      }
    });
  }


}
