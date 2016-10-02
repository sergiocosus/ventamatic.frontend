import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Observable} from "rxjs/Observable";
import {User} from "../user/user";
import {JwtHelper} from "angular2-jwt/angular2-jwt";
import {environment} from "../../environments/environment";
import {ReplaySubject} from "rxjs";
import {UserService} from "../user/user.service";

@Injectable()
export class AuthService {
  private apiUrl = environment.apiUrl;
  private authUrl = 'auth';
  private jwtHelper: JwtHelper = new JwtHelper();

  private loggedUserReplaySubject = new ReplaySubject<User>(1);
  private loggedUser:User = null;


  constructor(private http: Http,
              private userService:UserService) { }

  login(username, password) :Observable<any> {
    let body = JSON.stringify({
      username : username,
      password : password
    });

    const contentHeaders = new Headers();
    contentHeaders.append('Accept', 'application/json');
    contentHeaders.append('Content-Type', 'application/json');
    return this.http.post(this.apiUrl + this.authUrl, body, {headers: contentHeaders})
      .map(this.extractData)
      .map((response:any) => {
        response.user = new User().parse(response.user);

        this.updateLoggedUserObservable(response.user);

        localStorage.setItem('id_token', response.token);
        return response;
      })
      .catch(this.handleError);
  }

  logout(){
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
  }

  getLoggedUser(){
    return this.loggedUserReplaySubject;
  }

  updateLoggedUserObservable(user?:User) {
    if (user) {
      this.loggedUserReplaySubject.next(user);
    } else {
      this.userService.getMe().subscribe(
        account => {
          this.loggedUser = account;
          this.loggedUserReplaySubject.next(this.loggedUser);
        }
      );
    }
  }

  isTokenValid(){
    var token = localStorage.getItem('id_token');
    if(token){
      if(this.jwtHelper.isTokenExpired(token)){
        this.logout();
      }else{
        return true;
      }
    }
    return false;
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    localStorage.setItem('user', JSON.stringify(body.user));

    return body || { };
  }

  private handleError (errorResponse: Response) {
    let json = errorResponse.json() || 'Error del servidor';
    console.log(json);
    return Observable.throw(json.error || json);
  }
}
