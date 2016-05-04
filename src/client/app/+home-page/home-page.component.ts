import {Component, OnInit, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router, CanActivate} from 'angular2/router';
import {AuthService} from "../services/auth.service";
import {UserService} from "../user/user.service";
import {User} from "../user/user";

@Component({
  moduleId: __moduleName,
  selector: 'home-page',
  templateUrl: 'home-page.component.html',
  // styleUrls: ['home-page.component.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES],
  providers: [AuthService, UserService]
})

export class HomePageComponent implements OnInit {

  public options = [
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

  public time = "8:00pm";
    
  public user:User;
  public users:User[];
    
  constructor(private auth:AuthService, private userService:UserService,private router:Router) {}
  
  logout() {
      this.auth.logout();
      this.router.navigate(['LogIn']);
  }
    
  ngOnInit() {
      this.user  = this.auth.getLoggedUser();
      this.userService.getAll()
          .subscribe(
              users => {this.users = users; }
          )
  }
    
}
