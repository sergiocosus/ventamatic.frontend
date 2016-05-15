import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { LoginComponent } from './+login';
import { Routes, Router , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { AppComponent } from './+app';
import {AuthService} from "./services/auth.service";

@Component({
  moduleId: module.id,
  selector: 'ventamatic-frontend-app',
  templateUrl: 'ventamatic-frontend.component.html',
  styleUrls: ['ventamatic-frontend.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, AuthService],
  encapsulation: ViewEncapsulation.None,

})
@Routes([
  {path: '/app', component: AppComponent},
  {path: '/login', component: LoginComponent}
])
export class VentamaticFrontendAppComponent implements OnInit {
  title = 'ventamatic-frontend works!';

  constructor(private router: Router, private authService:AuthService) {

  }

  ngOnInit():any {
    if(!this.authService.isTokenValid()){
      this.router.navigate(['/login']);
    }
  }
}