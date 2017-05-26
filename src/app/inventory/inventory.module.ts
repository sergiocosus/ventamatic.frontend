import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {MdCardModule, MdDialogModule} from '@angular/material';
import {InventoryService} from './services/inventory.service';
import {InventoryEditDialogComponent} from './components/inventory-edit-dialog/inventory-edit-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    MdDialogModule,
    MdCardModule,
  ],
  declarations: [
    InventoryEditDialogComponent
  ],
  entryComponents: [
    InventoryEditDialogComponent
  ],
  providers: [
    InventoryService,
  ],
  exports: [
    InventoryEditDialogComponent
  ]
})
export class InventoryModule { }
