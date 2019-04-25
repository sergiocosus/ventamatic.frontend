import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { ProductCartRowComponent } from './components/product-cart-row/product-cart-row.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { InventoryCartComponent } from './components/inventory-cart/inventory-cart.component';

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
}
