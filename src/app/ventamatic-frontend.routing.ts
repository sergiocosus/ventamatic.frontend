import { Routes, RouterModule } from "@angular/router";
import {AppComponent} from "./+app/app.component";
import {LoginComponent} from "./+login/login.component";
import {UsuariosComponent} from "./+app/+usuarios/usuarios.component";
import {VentaComponent} from "./+app/+venta/venta.component";
import {CompraComponent} from "./+app/+compra/compra.component";
import {InventarioComponent} from "./+app/+inventario/inventario.component";
import {ProductosComponent} from "./+app/+productos/productos.component";
import {ClientesComponent} from "./+app/+clientes/clientes.component";
import {ProveedoresComponent} from "./+app/+proveedores/proveedores.component";
import {ReportesComponent} from "./+app/+reportes/reportes.component";
import {RolesComponent} from "./+app/+roles/roles.component";
import {SucursalesComponent} from "./+app/+sucursales/sucursales.component";
import {SelectBranchComponent} from "./+app/+venta/select-branch/select-branch.component";
import {InventorySelectBranch} from "./+app/+inventario/select-branch/select-branch.component";

import {InventoryComponent} from "./+app/+inventario/inventory/inventory.component";
import {SaleComponent} from "./+app/+venta/sale/sale.component";


export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'app',
    component: AppComponent,
    children: [
      {
        path: '',
        component: AppComponent
      },
      {
        path: 'usuarios',
        component: UsuariosComponent
      },
      {
        path: 'venta',
        component: VentaComponent,
        children: [
          {
            path: '',
            component: SelectBranchComponent
          },
          {
            path: ':branch_id',
            component: SaleComponent
          },
        ]
      },
      {
        path: 'compra',
        component: CompraComponent
      },
      {
        path: 'inventario',
        component: InventarioComponent,
        children: [
          {
            path: '',
            component: InventorySelectBranch
          },
          {
            path: ':branch_id',
            component: InventoryComponent
          },
        ]
      },
      {
        path: 'productos',
        component: ProductosComponent
      },
      {
        path: 'clientes',
        component: ClientesComponent
      },
      {
        path: 'proveedores',
        component: ProveedoresComponent
      },
      {
        path: 'reportes',
        component: ReportesComponent
      },
      {
        path: 'roles',
        component: RolesComponent
      },
      {
        path: 'sucursales',
        component: SucursalesComponent
      },
    ]
  },
  //{ path: '**', component: PageNotFoundComponent },
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
