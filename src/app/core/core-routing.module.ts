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
        loadChildren: './main/main.module#MainModule',
      },
      {
        path: 'mi-cuenta',
        loadChildren: './my-account/my-account.module#MyAccountModule',
      },
      {
        path: 'usuarios',
        loadChildren: './users/users.module#UsersModule',
      },
      {
        path: 'venta',
        loadChildren: './sale/sale.module#SaleModule',
      },
      {
        path: 'compra',
        loadChildren: './buy/buy.module#BuyModule'
      },
      {
        path: 'inventario',
        loadChildren: './inventories/inventories.module#InventoriesModule',
      },
      {
        path: 'productos',
        loadChildren: './products/products.module#ProductsModule',
      },
      {
        path: 'clientes',
        loadChildren: './clients/clients.module#ClientsModule',
      },
      {
        path: 'proveedores',
        loadChildren: './suppliers/suppliers.module#SuppliersModule',
      },
      {
        path: 'reportes',
        loadChildren: './reports/reports.module#ReportsModule',
      },
      {
        path: 'roles',
        loadChildren: './roles/roles.module#RolesModule',
      },
      {
        path: 'sucursales',
        loadChildren: './branches/branches.module#BranchesModule',
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
