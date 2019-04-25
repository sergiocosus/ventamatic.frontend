import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { FindProductComponent } from './components/find-product/find-product.component';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  imports: [
    SharedModule,
    AuthModule,
  ],
  declarations: [
    ProductSearchComponent,
    FindProductComponent,
    ProductDialogComponent,
  ],
  entryComponents: [
    ProductDialogComponent,
  ],
  exports: [
    ProductSearchComponent,
    FindProductComponent,
    ProductDialogComponent,
  ]
})
export class ProductModule {
}
