import { NgModule } from '@angular/core';
import { SuppliersRoutingModule } from './suppliers-routing.module';
import {ProveedoresComponent} from './proveedores.component';
import {AuthModule} from '../../modules/auth/auth.module';
import {SupplierModule} from '../../modules/supplier/supplier.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    SuppliersRoutingModule,
    SupplierModule,
    AuthModule,
  ],
  declarations: [
    ProveedoresComponent,
  ]
})
export class SuppliersModule { }
