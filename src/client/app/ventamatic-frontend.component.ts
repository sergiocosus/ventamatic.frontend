import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {LogInComponent} from './+log-in';
import {HomePageComponent} from './+home-page';

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
  {path: '/', name: 'HomePage', component: HomePageComponent},
  {path: '/login', name: 'LogIn', component: LogInComponent}
])
export class VentamaticFrontendApp {
}
