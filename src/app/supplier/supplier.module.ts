import { NgModule } from '@angular/core';
import { SupplierSearchComponent } from './supplier-search/supplier-search.component';
import {SharedModule} from '../shared/shared.module';
import {SupplierService} from '../app/+proveedores/shared/supplier.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    SupplierSearchComponent
  ],
  providers: [
    SupplierService
  ],
  exports:[
    SupplierSearchComponent
  ]
})
export class SupplierModule { }
