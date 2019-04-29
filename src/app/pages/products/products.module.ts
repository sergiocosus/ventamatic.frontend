import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import {ProductosComponent} from './productos.component';
import {SharedModule} from '../../shared/shared.module';
import {ProductModule} from '../../modules/product/product.module';
import {AuthModule} from '../../modules/auth/auth.module';

@NgModule({
  imports: [
    SharedModule,
    ProductsRoutingModule,
    ProductModule,
    AuthModule,
  ],
  declarations: [
    ProductosComponent
  ]
})
export class ProductsModule { }
