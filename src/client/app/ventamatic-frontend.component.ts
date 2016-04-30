import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {LogInComponent} from './+log-in';

@Component({
  moduleId: __moduleName,
  selector: 'ventamatic-frontend-app',
  providers: [ROUTER_PROVIDERS],
  templateUrl: 'ventamatic-frontend.component.html',
  styleUrls: ['ventamatic-frontend.component.css'],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
@RouteConfig([
  {path: '/login', name: 'LogIn', component: LogInComponent}
])
export class VentamaticFrontendApp {
  defaultMeaning: number = 42;

  meaningOfLife(meaning?: number) {
    return `The meaning of life is ${meaning || this.defaultMeaning}`;
  }
}
