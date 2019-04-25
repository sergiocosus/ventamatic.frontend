import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { MatCardModule, MatDialogModule } from '@angular/material';
import { InventoryEditDialogComponent } from './components/inventory-edit-dialog/inventory-edit-dialog.component';
import { InventoryQuantityDialogComponent } from './components/inventory-quantity-dialog/inventory-quantity-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    MatDialogModule,
    MatCardModule,
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
}
