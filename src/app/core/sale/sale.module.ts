import { NgModule } from '@angular/core';
import { SaleRoutingModule } from './sale-routing.module';
import {VentaComponent} from './venta.component';
import {SaleComponent} from './sale/sale.component';
import {SelectBranchComponent} from './select-branch/select-branch.component';
import {SharedModule} from '../../shared/shared.module';
import {SaleModule as SharedSaleModule} from '../../sale/sale.module';
import {ClientModule} from '../../client/client.module';
import {ProductModule} from '../../product/product.module';
import {InventoryModule} from '../../inventory/inventory.module';

@NgModule({
  imports: [
    SharedModule,
    SaleRoutingModule,
    SharedSaleModule,
    ClientModule,
    ProductModule,
    InventoryModule,
  ],
  declarations: [
    VentaComponent,
    SaleComponent,
    SelectBranchComponent
  ]
})
export class SaleModule { }
