import {Http, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import {environment} from '../../../environments/environment';
import {LocalStorageService} from './local-storage.service';
import {Observable} from 'rxjs/Observable';


export class ApiHttp {
  private apiUrl = environment.apiUrl;

  constructor(private http: Http,
              private localStorage: LocalStorageService){}

  setGlobalHeaders(headers: Array<Object>, request: Request|RequestOptionsArgs): void {
    // this.http.setGlobalHeaders(headers, request);
  }

  get(url: string, data?: any, options?: RequestOptionsArgs): Observable<any> {
    const params = this.serializeGetParams(data);
    return this.http.get(this.apiUrl + url + params, this.appendHeaders(options))
      .map(this.mapJson)
      .catch(this.handleError);
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    return this.http.post(this.apiUrl + url, JSON.stringify(body), this.appendHeaders(options))
      .map(this.mapJson)
      .catch(this.handleError);
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    return this.http.put(this.apiUrl + url, JSON.stringify(body), this.appendHeaders(options))
      .map(this.mapJson)
      .catch(this.handleError);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.http.delete(this.apiUrl + url, this.appendHeaders(options))
      .map(this.mapJson)
      .catch(this.handleError);
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    return this.http.patch(this.apiUrl + url, JSON.stringify(body), this.appendHeaders(options))
      .map(this.mapJson)
      .catch(this.handleError);
  }

  head(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.http.head(this.apiUrl + url, this.appendHeaders(options))
      .map(this.mapJson)
      .catch(this.handleError);
  }

  private mapJson(res: Response): any{
    return res.json().data;
  }


  private serializeGetParams(object: any): string {
    if (!object) {
      return '';
    }

    let str = '?';
    for (const key in object) {
      if (str != '') {
        str += '&';
      }
      if (Array.isArray(object[key])){
        object[key].forEach(value => {
          str += key + encodeURIComponent('[]') + '='
            + (value ? encodeURIComponent(value) : '') + '&';
        });
      } else {
        str += key + '=' + (object[key] ? encodeURIComponent(object[key]) : '');
      }
    }
    return str;
  }

  private appendHeaders(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (!options) {
      options = {};
    }

    if (!options.headers) {
      options.headers = new Headers();
    }
    const headers = options.headers;
    headers.append('Authorization', 'Bearer ' + this.localStorage.get('access_token'));
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return options;
  }

  private handleError(error: any, observable: Observable<any>) {
    let json;
    if (error.json){
      json = error.json();
    }

    if (json) {
      console.error(json);
      return Observable.throw(json);
    } else {
      console.log(error);
      return error;
    }

  }
}

export function apiHttpServiceFactory (http: Http, localStorage: LocalStorageService) {
  return new ApiHttp(http, localStorage);
};

export let apiHttpServiceProvider =
{
  provide: ApiHttp,
  useFactory: apiHttpServiceFactory,
  deps: [Http, LocalStorageService]
};

