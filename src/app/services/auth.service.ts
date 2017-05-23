import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";
import {ReplaySubject} from "rxjs";
import {UserService} from "../user/user.service";
import {User} from "../user/user";
import {ApiHttp} from '../shared/api-http';
import {LocalStorageService} from '../shared/services/local-storage.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  private loggedUserReplaySubject = new ReplaySubject<User>(1);
  private loggedUser: User = null;

  constructor(private apiHttp: ApiHttp,
              private http: Http,
              private userService: UserService,
              private localStorage: LocalStorageService,
              private router: Router) {
  }

  login(username, password): Observable<any> {
    return new Observable((subscriber) => {
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('grant_type', 'password');
      urlSearchParams.append('client_id', environment.apiClientID);
      urlSearchParams.append('client_secret', environment.apiClientSecret);
      urlSearchParams.append('username', username);
      urlSearchParams.append('password', password);
      let body = urlSearchParams.toString();

      this.http.post(environment.apiUrl + environment.apiAuthPath, body, {headers: headers}).subscribe(
        data => {
          let json = data.json();
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
    this.updateLoggedUserObservable({logout: true}).subscribe(() => {});
  }

  getLoggedUser() {
    if (!this.loggedUser) {
      this.loggedUser = new User();
      this.updateLoggedUserObservable();
    }
    return this.loggedUserReplaySubject;
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
            //if (error.code === 1106 || error.code === 1107) {
            //  this.noty.alert(this.messages.sessionExpired);
            //  this.logout();
            //}
            obs.error(error);
            obs.complete();
          }
        );
      }
    });
  }


}
