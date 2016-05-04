import {AuthHttp, AuthConfig} from "angular2-jwt/angular2-jwt";
import {environment} from "./environment";
import {RequestOptionsArgs, Response, Request, Http} from "angular2/http";
import {Observable} from "rxjs/Observable";
import {provide} from "angular2/core";


export class ApiHttp extends AuthHttp{
    private apiUrl = environment.apiUrl;

    setGlobalHeaders(headers:Array<Object>, request:Request|RequestOptionsArgs):void {
        super.setGlobalHeaders(headers, request);
    }

    get(url:string, options?:RequestOptionsArgs):Observable<Response> {
        return super.get(this.apiUrl + url, options)
            .map(this.mapJson);
    }

    post(url:string, body:any, options?:RequestOptionsArgs):Observable<Response> {
        return super.post(this.apiUrl + url, JSON.stringify(body), options)
            .map(this.mapJson);
    }

    put(url:string, body:any, options?:RequestOptionsArgs):Observable<Response> {
        return super.put(this.apiUrl + url, JSON.stringify(body), options)
            .map(this.mapJson);
    }

    delete(url:string, options?:RequestOptionsArgs):Observable<Response> {
        return super.delete(this.apiUrl + url, options)
            .map(this.mapJson);
    }

    patch(url:string, body:any, options?:RequestOptionsArgs):Observable<Response> {
        return super.patch(this.apiUrl + url, JSON.stringify(body), options)
            .map(this.mapJson);
    }

    head(url:string, options?:RequestOptionsArgs):Observable<Response> {
        return super.head(this.apiUrl + url, options)
            .map(this.mapJson);
    }
    
    private mapJson(res:Response){
        return res.json();
    }
    
}

export const API_HTTP_PROVIDERS = 
    provide(ApiHttp, {
    useFactory: (http) => {
        return new ApiHttp(new AuthConfig({
            tokenName: 'id_token'
        }), http);
    },
    deps: [Http]
});