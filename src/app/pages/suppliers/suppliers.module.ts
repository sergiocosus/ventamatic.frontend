import { NgModule } from '@angular/core';
import { SuppliersRoutingModule } from './suppliers-routing.module';
import {ProveedoresComponent} from './proveedores.component';
import {AuthModule} from '../../modules/auth/auth.module';
import {SupplierModule} from '../../modules/supplier/supplier.module';
import {SharedModule} from '../../shared/shared.module';
import { MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    SuppliersRoutingModule,
    SupplierModule,
    AuthModule,
    MatToolbarModule,
  ],
  declarations: [
    ProveedoresComponent,
  ]
})
export class SuppliersModule { }
