import {ModuleWithProviders, NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {BeginBuyComponent} from './components/begin-buy/begin-buy.component';
import {BuyService} from './services/buy.service';
import {AddProductDialogComponent} from './components/add-product-dialog/add-product-dialog.component';
import {ProductCartComponent} from './components/product-cart/product-cart.component';

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
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BuyModule,
      providers: [
        BuyService,
      ],
    };
  }
}
