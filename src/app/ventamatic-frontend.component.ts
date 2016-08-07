import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { LoginComponent } from './+login';
import { Routes, Router , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { SimpleNotificationsComponent } from 'angular2-notifications/components'

import { AppComponent } from './+app';
import {AuthService} from "./services/auth.service";
import {TicketComponent} from "./+app/+venta/ticket/ticket.component";
import {TicketService} from "./+app/+venta/ticket/ticket.service";

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'ventamatic-frontend.component.html',
  styleUrls: ['ventamatic-frontend.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    SimpleNotificationsComponent,
    TicketComponent
  ],
  providers: [
    ROUTER_PROVIDERS,
    AuthService,
    TicketService
  ],
  encapsulation: ViewEncapsulation.None,

})
@Routes([
  {path: '/app', component: AppComponent},
  {path: '/login', component: LoginComponent}
])
export class VentamaticFrontendAppComponent implements OnInit {
  title = 'ventamatic-frontend works!';

  public options = {
    timeOut: 5000,
    lastOnBottom: true
  };
  constructor(private router: Router,
              private authService:AuthService) {

  }

  ngOnInit():any {
    if(!this.authService.isTokenValid()){
      this.router.navigate(['/login']);
    }
  }
}
