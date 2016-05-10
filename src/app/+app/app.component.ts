import { Component, OnInit } from '@angular/core';
import { User } from "../user/user";
import { AuthService } from "../services/auth.service";
import { UserService } from "../user/user.service";
import { UsuariosComponent } from './+usuarios';
import { Routes , ROUTER_DIRECTIVES, Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [AuthService, UserService]

})
@Routes([
  {path: '/usuarios', component: UsuariosComponent}
])
export class AppComponent implements OnInit {

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
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.user  = this.auth.getLoggedUser();
    this.userService.getAll()
      .subscribe(
        users => {this.users = users; }
      )
  }

}
