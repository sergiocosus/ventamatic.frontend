import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {environment} from "../environment";
import {Observable} from "rxjs/Observable";
import {User} from "../user/user";

@Injectable()
export class AuthService {
  private _apiUrl = environment.apiUrl;
  private _authUrl = 'auth';  // URL to web api
  
  constructor(private http: Http) {}
  

  login(username, password) :Observable<any> {
    let body = JSON.stringify({
      username : username,
      password : password
    });
    const contentHeaders = new Headers();
    contentHeaders.append('Accept', 'application/json');
    contentHeaders.append('Content-Type', 'application/json');
    var observable = this.http.post(this._apiUrl + this._authUrl, body, { headers: contentHeaders })
      .map(this.extractData)
      .catch(this.handleError);

    observable.subscribe(
      response => {
        localStorage.setItem('id_token', response.token);
      },
      error => {
        alert(error);
        console.log(error);
      }
    );

    return observable;
  }

  logout(){
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
  }

  getLoggedUser():User{
    return JSON.parse(localStorage.getItem('user'));
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    localStorage.setItem('user', JSON.stringify(body.user));

    return body || { };
  }

  private handleError (error: any) {
    let errMsg = error.message || 'Server error';
    console.error(error);
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
