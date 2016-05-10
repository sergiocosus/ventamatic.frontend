import { Component, ViewEncapsulation } from '@angular/core';
import { LoginComponent } from './+login';
import { Routes, Router , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { AppComponent } from './+app';

@Component({
  moduleId: module.id,
  selector: 'ventamatic-frontend-app',
  templateUrl: 'ventamatic-frontend.component.html',
  styleUrls: ['ventamatic-frontend.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS],
  encapsulation: ViewEncapsulation.None,

})
@Routes([
  {path: '/app', component: AppComponent},
  {path: '/login', component: LoginComponent}
])
export class VentamaticFrontendAppComponent {
  title = 'ventamatic-frontend works!';

  constructor(private router: Router) {}

}
