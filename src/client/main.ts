import {bootstrap} from 'angular2/platform/browser';
import {enableProdMode, provide} from 'angular2/core';
import {environment} from './app/environment';
import {VentamaticFrontendApp} from './app/ventamatic-frontend.component';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {AUTH_PROVIDERS, AuthConfig, AuthHttp} from "angular2-jwt/angular2-jwt";
import {API_HTTP_PROVIDERS} from "./app/api-http";

if (environment.production) {
  enableProdMode();
}

bootstrap(VentamaticFrontendApp, [HTTP_PROVIDERS, AUTH_PROVIDERS,
  provide(AuthHttp, {
    useFactory: (http) => {
      return new AuthHttp(new AuthConfig({
        tokenName: 'id_token'
      }), http);
    },
    deps: [Http]
  }),API_HTTP_PROVIDERS]);
