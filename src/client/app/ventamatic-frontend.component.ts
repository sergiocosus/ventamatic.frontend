import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {LogInComponent} from './+log-in';
import {HomePageComponent} from './+home-page';
import 'rxjs/Rx';
import {AuthService} from "./services/auth.service";
import {LoggedInRouterOutlet} from "./logged-in-router-outlet.directive";

@Component({
  moduleId: __moduleName,
  selector: 'ventamatic-frontend-app',
  providers: [ROUTER_PROVIDERS, AuthService],
  templateUrl: 'ventamatic-frontend.component.html',
  styleUrls: ['ventamatic-frontend.component.css'],
  directives: [LoggedInRouterOutlet],
  pipes: []
})
@RouteConfig([
  {path: '/', name: 'HomePage', component: HomePageComponent},
  {path: '/login', name: 'LogIn', component: LogInComponent}
])
export class VentamaticFrontendApp implements OnInit{
  constructor(
      private auth:AuthService
  ){}

  ngOnInit():any {
    return undefined;
  }

}
