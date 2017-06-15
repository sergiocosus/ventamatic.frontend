import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProveedoresComponent} from './proveedores.component';

const routes: Routes = [
  {
    path: '',
    component: ProveedoresComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
