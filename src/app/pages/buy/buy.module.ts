import { NgModule } from '@angular/core';
import { BuyRoutingModule } from './buy-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {BuyModule as SharedBuyModule} from '../../modules/buy/buy.module';
import {BuyComponent} from './buy.component';
import {ProductModule} from '../../modules/product/product.module';

@NgModule({
  imports: [
    SharedModule,
    BuyRoutingModule,
    SharedBuyModule,
    ProductModule,
  ],
  declarations: [
    BuyComponent
  ],
})
export class BuyModule { }
