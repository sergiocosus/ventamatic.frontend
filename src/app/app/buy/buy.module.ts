import { NgModule } from '@angular/core';
import { BuyRoutingModule } from './buy-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {BuyComponent} from './buy.component';
import {BuyModule as SharedBuyModule} from '../../buy/buy.module';
import {ProductCartComponent} from './components/product-cart/product-cart.component';
import {AddProductDialogComponent} from './components/add-product-dialog/add-product-dialog.component';
import {MdDialogModule} from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    BuyRoutingModule,
    SharedBuyModule,
    MdDialogModule,
  ],
  declarations: [
    BuyComponent,
    AddProductDialogComponent,
    ProductCartComponent,
  ],
  entryComponents: [
    AddProductDialogComponent,
  ]
})
export class BuyModule { }
