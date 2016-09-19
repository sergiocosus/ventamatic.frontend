import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Request, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import {environment} from "../../environments/environment";

export class ApiHttp {
  private apiUrl = environment.apiUrl;

  constructor(private authHttp:AuthHttp){}

  setGlobalHeaders(headers:Array<Object>, request:Request|RequestOptionsArgs):void {
    this.authHttp.setGlobalHeaders(headers, request);
  }

  get(url:string, data?:any, options?:RequestOptionsArgs):Observable<any> {
    var params = this.serializeGetParams(data);
    return this.authHttp.get(this.apiUrl + url + params, options)
      .map(this.mapJson)
      .catch(this.handleError);
  }

  post(url:string, body:any, options?:RequestOptionsArgs):Observable<any> {
    return this.authHttp.post(this.apiUrl + url, JSON.stringify(body), options)
      .map(this.mapJson)
      .catch(this.handleError);
  }

  put(url:string, body:any, options?:RequestOptionsArgs):Observable<any> {
    return this.authHttp.put(this.apiUrl + url, JSON.stringify(body), options)
      .map(this.mapJson)
      .catch(this.handleError);
  }

  delete(url:string, options?:RequestOptionsArgs):Observable<any> {
    return this.authHttp.delete(this.apiUrl + url, options)
      .map(this.mapJson)
      .catch(this.handleError);
  }

  patch(url:string, body:any, options?:RequestOptionsArgs):Observable<any> {
    return this.authHttp.patch(this.apiUrl + url, JSON.stringify(body), options)
      .map(this.mapJson)
      .catch(this.handleError);
  }

  head(url:string, options?:RequestOptionsArgs):Observable<any> {
    return this.authHttp.head(this.apiUrl + url, options)
      .map(this.mapJson)
      .catch(this.handleError);
  }

  private mapJson(res:Response):any{
    return res.json().data;
  }

  private serializeGetParams(object:any):string {
    if (!object) {
      return "";
    }

    var str = "?";
    for (var key in object) {
      if (str != "") {
        str += "&";
      }
      str += key + "=" + encodeURIComponent(object[key]);
    }
    return str;
  }

  private handleError(error:any, observable:Observable<any>) {
    var json = error.json();

    if(json){
      console.error(json);
      return Observable.throw(json);
    } else {
      console.log(error);
      return error;
    }

  }
}

let apiHttpServiceFactory = (authHttp: AuthHttp) => {
  return new ApiHttp(authHttp);
};

export let apiHttpServiceProvider =
{
  provide: ApiHttp,
  useFactory: apiHttpServiceFactory,
  deps: [AuthHttp]
};

