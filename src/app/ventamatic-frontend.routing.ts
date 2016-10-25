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
import {AuthGuardService} from "./services/auth-guard.service";
import {NoAuthGuardService} from "./services/no-auth-guard.service";
import {MainComponent} from "./+app/main/main.component";
import {SaleReportComponent} from "./+app/+reportes/sale-report/sale-report.component";
import {MenuReportComponent} from "./+app/+reportes/menu-report/menu-report.component";
import {BuyReportComponent} from "./+app/+reportes/buy-report/buy-report.component";
import {InventoryMovementReportComponent} from "./+app/+reportes/inventory-movement-report/inventory-movement-report.component";
import {InventoryReportComponent} from "./+app/+reportes/inventory-report/inventory-report.component";


export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate : [NoAuthGuardService]
  },
  {
    path: '',
    component: AppComponent,
    canActivate : [AuthGuardService],
    children: [
      {
        path: '',
        component: MainComponent
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
        component: ReportesComponent,
        children: [
          {
            path: '',
            component: MenuReportComponent
          },
          {
            path: 'venta',
            component: SaleReportComponent
          },
          {
            path: 'compra',
            component: BuyReportComponent
          },
          {
            path: 'entradas-salidas',
            component: InventoryMovementReportComponent
          },
          {
            path: 'inventario',
            component: InventoryReportComponent
          }
        ]
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
