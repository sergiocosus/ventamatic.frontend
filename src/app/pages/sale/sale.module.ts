import { NgModule } from '@angular/core';
import { SaleRoutingModule } from './sale-routing.module';
import {VentaComponent} from './venta.component';
import {SharedModule} from '@app/shared/shared.module';
import {SaleModule as SharedSaleModule} from '../../modules/sale/sale.module';
import {ClientModule} from '@app/client/client.module';
import {ProductModule} from '@app/product/product.module';
import {InventoryModule} from '@app/inventory/inventory.module';
import { MatIconModule } from '@angular/material';
import { SaleComponent } from './sale/sale.component';
import { SelectBranchComponent } from './select-branch/select-branch.component';

@NgModule({
  imports: [
    SharedModule,
    SaleRoutingModule,
    SharedSaleModule,
    ClientModule,
    ProductModule,
    InventoryModule,
    MatIconModule,
  ],
  declarations: [
    VentaComponent,
    SaleComponent,
    SelectBranchComponent
  ]
})
export class SaleModule { }
