import {Injectable} from 'angular2/core';
import { Http, Headers,Response } from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(private http: Http) {}
  private _apiUrl = 'http://local.ventamatic.com/api/v1/'
  private _authUrl = 'auth';  // URL to web api


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
          localStorage.setItem('jwt', response.token);
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
    );

    return observable;
  }

  logout(){
    localStorage.removeItem('jwt');
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body || { };
  }

  private handleError (error: any) {
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
