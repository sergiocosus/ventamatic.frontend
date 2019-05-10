import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { SupplierItemComponent } from './components/supplier-item/supplier-item.component';
import { SupplierSearchComponent } from './components/supplier-search/supplier-search.component';
import { SupplierDialogComponent } from './components/supplier-dialog/supplier-dialog.component';
import { VariousModule } from '../various/various.module';
import { AuthModule } from '../auth/auth.module';
import { MatIconModule, MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    VariousModule,
    AuthModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    SupplierSearchComponent,
    SupplierItemComponent,
    SupplierDialogComponent,
  ],
  entryComponents: [
    SupplierDialogComponent,
  ],
  exports: [
    SupplierSearchComponent,
    SupplierItemComponent,
    SupplierDialogComponent,
  ]
})
export class SupplierModule {
}
