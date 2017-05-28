import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BuyComponent} from "app/app/buy/buy.component";

const routes: Routes = [
  {
    path: '',
    component: BuyComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyRoutingModule { }
