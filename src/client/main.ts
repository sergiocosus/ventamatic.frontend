import {bootstrap} from 'angular2/platform/browser';
import {enableProdMode} from 'angular2/core';
import {environment} from './app/environment';
import {VentamaticFrontendApp} from './app/ventamatic-frontend.component';
import { HTTP_PROVIDERS } from 'angular2/http';

if (environment.production) {
  enableProdMode();
}

bootstrap(VentamaticFrontendApp, [HTTP_PROVIDERS]);
