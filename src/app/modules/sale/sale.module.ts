import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { InventoryCartRowComponent } from './components/inventory-cart-row/inventory-cart-row.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { InventoryCartComponent } from './components/inventory-cart/inventory-cart.component';
import { MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    MatIconModule,
  ],
  declarations: [
    InventoryCartRowComponent,
    InventoryCartComponent,
    TicketComponent,
  ],
  exports: [
    TicketComponent,
    InventoryCartRowComponent,
    InventoryCartComponent,
  ]
})
export class SaleModule {
}
