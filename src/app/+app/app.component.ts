import { Component, OnInit } from '@angular/core';
import { User } from "../user/user";
import { AuthService } from "../services/auth.service";
import { UserService } from "../user/user.service";
import { UsuariosComponent } from './+usuarios';
import { Routes , ROUTER_DIRECTIVES, Router} from '@angular/router';
import { VentaComponent } from './+venta';
import { CompraComponent } from './+compra';
import { InventarioComponent } from './+inventario';
import { ProductosComponent } from './+productos';
import { ClientesComponent } from './+clientes';
import { ProveedoresComponent } from './+proveedores';
import { ReportesComponent } from './+reportes';
import { RolesComponent } from './+roles';
import { SucursalesComponent } from './+sucursales';

@Component({
  moduleId: module.id,
  selector: 'app-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [AuthService, UserService]

})
@Routes([
  {path: '/usuarios', component: UsuariosComponent},
  {path: '/venta', component: VentaComponent},
  {path: '/compra', component: CompraComponent},
  {path: '/inventario', component: InventarioComponent},
  {path: '/productos', component: ProductosComponent},
  {path: '/clientes', component: ClientesComponent},
  {path: '/proveedores', component: ProveedoresComponent},
  {path: '/reportes', component: ReportesComponent},
  {path: '/roles', component: RolesComponent},
  {path: '/sucursales', component: SucursalesComponent}
])
export class AppComponent implements OnInit {

  public routes = [
    {
      name: 'Venta',
      path: '/app/venta'
    },
    {
      name: 'Compra',
      path: '/app/compra'
    },
    {
      name: 'Inventario',
      path: '/app/inventario'
    },
    {
      name: 'Productos',
      path: '/app/productos'
    },
    {
      name: 'Clientes',
      path: '/app/clientes'
    },
    {
      name: 'Proveedores',
      path: '/app/proveedores'
    },
    {
      name: 'Roles',
      path: '/app/roles'
    },
    {
      name: 'Sucursales',
      path: '/app/sucursales'
    },
    {
      name: 'Reportes',
      path: '/app/reportes'
    }
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
