import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { MatCardModule, MatDialogModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { InventoryEditDialogComponent } from './components/inventory-edit-dialog/inventory-edit-dialog.component';
import { InventoryQuantityDialogComponent } from './components/inventory-quantity-dialog/inventory-quantity-dialog.component';
import { InventorySearchComponent } from './components/inventory-search/inventory-search.component';

@NgModule({
  imports: [
    SharedModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    InventoryEditDialogComponent,
    InventoryQuantityDialogComponent,
    InventorySearchComponent,
  ],
  entryComponents: [
    InventoryEditDialogComponent,
    InventoryQuantityDialogComponent,
  ],
  exports: [
    InventoryEditDialogComponent,
    InventoryQuantityDialogComponent,
    InventorySearchComponent,
  ]
})
export class InventoryModule {
}
