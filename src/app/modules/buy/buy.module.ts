import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { BeginBuyComponent } from './components/begin-buy/begin-buy.component';
import { AddProductDialogComponent } from './components/add-product-dialog/add-product-dialog.component';
import { ProductCartComponent } from './components/product-cart/product-cart.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    BeginBuyComponent,
    AddProductDialogComponent,
    ProductCartComponent,
  ],
  entryComponents: [
    AddProductDialogComponent,
  ],
  exports: [
    BeginBuyComponent,
    AddProductDialogComponent,
    ProductCartComponent,
  ]
})
export class BuyModule {
}
