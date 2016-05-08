import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { ROUTER_PROVIDERS } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { AUTH_PROVIDERS } from "angular2-jwt/angular2-jwt";
import 'rxjs/Rx';
import { API_HTTP_PROVIDERS } from './app/shared/api-http'
import { VentamaticFrontendAppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(VentamaticFrontendAppComponent,
  [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    AUTH_PROVIDERS,
    API_HTTP_PROVIDERS
  ]);
