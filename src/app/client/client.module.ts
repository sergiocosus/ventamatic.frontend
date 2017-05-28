import { NgModule } from '@angular/core';
import { ClientSearchComponent } from './client-search/client-search.component';
import {ClientService} from "../app/+clientes/shared/client.service";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ClientSearchComponent,
  ],
  providers: [
    ClientService,
  ],
  exports: [
    ClientSearchComponent
  ]
})
export class ClientModule { }
