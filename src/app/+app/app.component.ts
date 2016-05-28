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
import { AsideNavComponent } from "./shared/aside-nav/aside-nav.component";
import {ProductService} from "../shared/product/product.service";

@Component({
  moduleId: module.id,
  selector: 'app-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES, AsideNavComponent],
  providers: [UserService, ProductService]

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

  public time = "8:00pm";

  public user:User;

  constructor(private authService:AuthService,
              private router:Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    if(!this.authService.isTokenValid()){
      this.router.navigate(['/login']);
    }else{
      this.user = this.authService.getLoggedUser();
    }
  }

}
