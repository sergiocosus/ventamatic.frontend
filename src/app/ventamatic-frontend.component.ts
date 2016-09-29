import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {AuthService} from "./services/auth.service";
import {TicketService} from "./+app/+venta/ticket/ticket.service";

@Component({
  selector: 'app-root',
  templateUrl: 'ventamatic-frontend.component.html',
  styleUrls: ['ventamatic-frontend.component.scss'],
  providers: [
    TicketService
  ],
  encapsulation: ViewEncapsulation.None,
})

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
