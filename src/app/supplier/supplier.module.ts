import {ModuleWithProviders, NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {SupplierService} from './services/supplier.service';
import {SupplierItemComponent} from './components/supplier-item/supplier-item.component';
import {SupplierCategoryService} from './services/supplier-category.service';
import {SupplierSearchComponent} from './components/supplier-search/supplier-search.component';
import {SupplierDialogComponent} from './components/supplier-dialog/supplier-dialog.component';
import {VariousModule} from '../various/various.module';
import {AuthModule} from '../auth/auth.module';

@NgModule({
  imports: [
    SharedModule,
    VariousModule,
    AuthModule,
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
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SupplierModule,
      providers: [
        SupplierService,
        SupplierCategoryService,
      ],
    };
  }
}
