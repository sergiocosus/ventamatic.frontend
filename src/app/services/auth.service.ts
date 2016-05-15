import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {environment} from "../environment";
import {Observable} from "rxjs/Observable";
import {User} from "../user/user";
import {JwtHelper} from "angular2-jwt/angular2-jwt";
import { NotificationsService } from 'angular2-notifications/components'

@Injectable()
export class AuthService {
  private apiUrl = environment.apiUrl;
  private authUrl = 'auth';
  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http, private notification:NotificationsService) {
    console.log(notification);
  }


  login(username, password) :Observable<any> {
    let body = JSON.stringify({
      username : username,
      password : password
    });
    const contentHeaders = new Headers();
    contentHeaders.append('Accept', 'application/json');
    contentHeaders.append('Content-Type', 'application/json');
    var observable = this.http.post(this.apiUrl + this.authUrl, body, { headers: contentHeaders })
      .map(this.extractData)
      .map(response => {
        response.user = new User().parse(response.user);
        return response;
      })
      .catch(this.handleError);

    observable.subscribe(
      response => {
        localStorage.setItem('id_token', response.token);
      },
      error => {
        this.notification.error('Error', error);
      }
    );

    return observable;
  }

  logout(){
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
  }

  getLoggedUser(){
    return new User().parse(JSON.parse(localStorage.getItem('user')));
  }

  isTokenValid(){
    var token = localStorage.getItem('id_token');
    if(token){
      if(this.jwtHelper.isTokenExpired(token)){
        localStorage.clear();
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
