import { NgModule } from '@angular/core';
import {ProductService} from "../shared/product/product.service";
import { ProductSearchComponent } from './product-search/product-search.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  providers: [
    ProductService,
  ],
  declarations: [
    ProductSearchComponent,
  ],
  exports: [
    ProductSearchComponent,
  ]
})
export class ProductModule { }
