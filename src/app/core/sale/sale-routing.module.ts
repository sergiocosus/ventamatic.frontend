import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VentaComponent} from './venta.component';
import {SelectBranchComponent} from './select-branch/select-branch.component';
import {SaleComponent} from './sale/sale.component';

const routes: Routes = [
  {
    path: '',
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
