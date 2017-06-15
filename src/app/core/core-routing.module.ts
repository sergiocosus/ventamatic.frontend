import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CoreComponent} from './core.component';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/core/main/main.module#MainModule',
      },
      {
        path: 'mi-cuenta',
        loadChildren: 'app/core/my-account/my-account.module#MyAccountModule',
      },
      {
        path: 'usuarios',
        loadChildren: 'app/core/users/users.module#UsersModule',
      },
      {
        path: 'venta',
        loadChildren: 'app/core/sale/sale.module#SaleModule',
      },
      {
        path: 'compra',
        loadChildren: 'app/core/buy/buy.module#BuyModule'
      },
      {
        path: 'inventario',
        loadChildren: 'app/core/inventories/inventories.module#InventoriesModule',
      },
      {
        path: 'productos',
        loadChildren: 'app/core/products/products.module#ProductsModule',
      },
      {
        path: 'clientes',
        loadChildren: 'app/core/clients/clients.module#ClientsModule',
      },
      {
        path: 'proveedores',
        loadChildren: 'app/core/suppliers/suppliers.module#SuppliersModule',
      },
      {
        path: 'reportes',
        loadChildren: 'app/core/reports/reports.module#ReportsModule',
      },
      {
        path: 'roles',
        loadChildren: 'app/core/roles/roles.module#RolesModule',
      },
      {
        path: 'sucursales',
        loadChildren: 'app/core/branches/branches.module#BranchesModule',
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
