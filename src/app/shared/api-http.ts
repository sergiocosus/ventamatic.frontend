import { provide } from "@angular/core";
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Request, RequestOptionsArgs, Response } from '@angular/http';
import { environment } from "../environment";
import { Observable } from "rxjs/Observable";

export class ApiHttp {
  private apiUrl = environment.apiUrl;

  constructor(private authHttp:AuthHttp){}

  setGlobalHeaders(headers:Array<Object>, request:Request|RequestOptionsArgs):void {
    this.authHttp.setGlobalHeaders(headers, request);
  }

  get(url:string, data?:any, options?:RequestOptionsArgs):Observable<any> {
    var params = this.serializeGetParams(data);
    return this.authHttp.get(this.apiUrl + url + params, options)
      .map(this.mapJson);
  }

  post(url:string, body:any, options?:RequestOptionsArgs):Observable<any> {
    return this.authHttp.post(this.apiUrl + url, JSON.stringify(body), options)
      .map(this.mapJson);
  }

  put(url:string, body:any, options?:RequestOptionsArgs):Observable<any> {
    return this.authHttp.put(this.apiUrl + url, JSON.stringify(body), options)
      .map(this.mapJson);
  }

  delete(url:string, options?:RequestOptionsArgs):Observable<any> {
    return this.authHttp.delete(this.apiUrl + url, options)
      .map(this.mapJson);
  }

  patch(url:string, body:any, options?:RequestOptionsArgs):Observable<any> {
    return this.authHttp.patch(this.apiUrl + url, JSON.stringify(body), options)
      .map(this.mapJson);
  }

  head(url:string, options?:RequestOptionsArgs):Observable<any> {
    return this.authHttp.head(this.apiUrl + url, options)
      .map(this.mapJson);
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
}


export const API_HTTP_PROVIDERS =
  provide(ApiHttp, {
    useFactory: (http) => {
      return new ApiHttp(http);
    },
    deps: [AuthHttp]
  });
