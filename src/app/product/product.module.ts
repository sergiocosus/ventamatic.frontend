import {ModuleWithProviders, NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {ProductService} from './services/product.service';
import {ProductSearchComponent} from './components/product-search/product-search.component';
import {FindProductComponent} from './components/find-product/find-product.component';
import {ProductDialogComponent} from './components/product-dialog/product-dialog.component';
import {AuthModule} from '../auth/auth.module';

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
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ProductModule,
      providers: [
        ProductService,
      ],
    };
  }
}
