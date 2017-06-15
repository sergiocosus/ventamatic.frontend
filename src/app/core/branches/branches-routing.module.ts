import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BranchesComponent} from './branches.component';

const routes: Routes = [
  {
    path: '',
    component: BranchesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchesRoutingModule { }
