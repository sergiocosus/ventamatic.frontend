import {ModuleWithProviders, NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ProductCartRowComponent} from './components/product-cart-row/product-cart-row.component';
import {SaleService} from './services/sale.service';
import {TicketService} from './services/ticket.service';
import {TicketComponent} from './ticket/ticket.component';
import {InventoryCartComponent} from './components/inventory-cart/inventory-cart.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    ProductCartRowComponent,
    InventoryCartComponent,
    TicketComponent,
  ],

  exports: [
    TicketComponent,
    ProductCartRowComponent,
    InventoryCartComponent,
  ]
})
export class SaleModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SaleModule,
      providers: [
        SaleService,
        TicketService,
      ],
    };
  }
}
