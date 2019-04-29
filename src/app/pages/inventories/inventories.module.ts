import { NgModule } from '@angular/core';
import { InventoriesRoutingModule } from './inventories-routing.module';
import {InventoryComponent} from './inventory.component';
import {SharedModule} from '../../shared/shared.module';
import {InventoryDetailComponent} from './components/inventory-detail/inventory-detail.component';
import {InventoryModule} from '../../modules/inventory/inventory.module';
import {SelectBranchComponent} from './components/select-branch/select-branch.component';
import {AuthModule} from '../../modules/auth/auth.module';

@NgModule({
  imports: [
    SharedModule,
    InventoriesRoutingModule,
    InventoryModule,
    AuthModule,
  ],
  declarations: [
    InventoryComponent,
    InventoryDetailComponent,
    SelectBranchComponent,
  ]
})
export class InventoriesModule { }
