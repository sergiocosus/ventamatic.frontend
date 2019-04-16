import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from './local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export class ApiHttp {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
              private localStorage: LocalStorageService) {
  }

  get(url: string, data?: any, options?): Observable<any> {
    const params = this.serializeGetParams(data);
    return this.http.get(this.apiUrl + url + params, this.appendHeaders(options));
  }

  post(url: string, body: any, options?): Observable<any> {
    return this.http.post(this.apiUrl + url, body, this.appendHeaders(options));
  }

  put(url: string, body: any, options?): Observable<any> {
    return this.http.put(this.apiUrl + url, body, this.appendHeaders(options));
  }

  delete(url: string, options?): Observable<any> {
    return this.http.delete(this.apiUrl + url, this.appendHeaders(options));
  }

  patch(url: string, body: any, options?): Observable<any> {
    return this.http.patch(this.apiUrl + url, body, this.appendHeaders(options));
  }

  head(url: string, options?): Observable<any> {
    return this.http.head(this.apiUrl + url, this.appendHeaders(options));
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
      if (Array.isArray(object[key])) {
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

  private appendHeaders(options) {
    if (!options) {
      options = {};
    }

    if (!options.headers) {
      options['headers'] = new HttpHeaders();
    }
    options.headers = options.headers.append('Authorization', 'Bearer ' + this.localStorage.get('access_token'));

    return options;
  }
}

export function apiHttpServiceFactory(http: HttpClient, localStorage: LocalStorageService) {
  return new ApiHttp(http, localStorage);
}

export let apiHttpServiceProvider = {
  provide: ApiHttp,
  useFactory: apiHttpServiceFactory,
  deps: [HttpClient, LocalStorageService]
};

