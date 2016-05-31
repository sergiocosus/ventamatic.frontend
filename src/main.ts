import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { ROUTER_PROVIDERS } from '@angular/router';
import { HTTP_PROVIDERS, Http } from '@angular/http';
import { AuthHttp, AuthConfig } from "angular2-jwt/angular2-jwt";
import 'rxjs/Rx';
import { NotificationsService } from 'angular2-notifications/components'
import { API_HTTP_PROVIDERS } from './app/shared/api-http'
import { VentamaticFrontendAppComponent, environment } from './app';

if (environment.production) {
  enableProdMode();
}

bootstrap(VentamaticFrontendAppComponent,
  [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(AuthHttp, {
      useFactory: (http) => {
        return new AuthHttp(new AuthConfig({
          globalHeaders: [
            { 'Content-Type':'application/json' },
            { 'Accept':'application/json' }
          ],
        }), http);
      },
      deps: [Http]
    }),
    API_HTTP_PROVIDERS,
    NotificationsService,
  ]);
