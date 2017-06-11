import {ModuleWithProviders, NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {MdCardModule, MdDialogModule} from '@angular/material';
import {InventoryService} from './services/inventory.service';
import {InventoryEditDialogComponent} from './components/inventory-edit-dialog/inventory-edit-dialog.component';
import {InventoryQuantityDialogComponent} from './components/inventory-quantity-dialog/inventory-quantity-dialog.component';
import { InventoryMovementTypeService } from './services/inventory-movement-type.service';

@NgModule({
  imports: [
    SharedModule,
    MdDialogModule,
    MdCardModule,
  ],
  declarations: [
    InventoryEditDialogComponent,
    InventoryQuantityDialogComponent,
  ],
  entryComponents: [
    InventoryEditDialogComponent,
    InventoryQuantityDialogComponent,
  ],

  exports: [
    InventoryEditDialogComponent,
    InventoryQuantityDialogComponent,
  ]
})
export class InventoryModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: InventoryModule,
      providers: [
        InventoryService,
        InventoryMovementTypeService,
      ],
    };
  }
}
