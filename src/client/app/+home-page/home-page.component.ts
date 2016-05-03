import {Component, OnInit, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router, CanActivate} from 'angular2/router';
import {AuthService} from "../services/auth.service";
import {tokenNotExpired} from "angular2-jwt/angular2-jwt";

@Component({
  moduleId: __moduleName,
  selector: 'home-page',
  templateUrl: 'home-page.component.html',
  // styleUrls: ['home-page.component.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES],
  providers: [AuthService]
})

export class HomePageComponent implements OnInit {

  options = [
      'Ventas',
      'Compras',
      'Inventario',
      'Producto',
      'Clientes',
      'Provedores',
      'User',
      'Permisos',
      'Sucursales',
      'Reportes',
  ];

    jwt:string;
    decodedJwt: string;

  username = "Pepe pequitas";
  time = "8:00pm";
    
  constructor(private auth:AuthService, private router:Router) {}
  
  logout() {
      this.auth.logout();
      this.router.navigate(['LogIn']);
  }
    
  ngOnInit() {
      var user = this.auth.getLoggedUser();
      this.username = user.username;
  }

}
