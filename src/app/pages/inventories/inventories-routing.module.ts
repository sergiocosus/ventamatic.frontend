import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InventoryDetailComponent} from './components/inventory-detail/inventory-detail.component';
import {InventoryComponent} from './inventory.component';
import {SelectBranchComponent} from './components/select-branch/select-branch.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
    children: [
      {
        path: '',
        component: SelectBranchComponent
      },
      {
        path: ':branch_id',
        component: InventoryDetailComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoriesRoutingModule { }
