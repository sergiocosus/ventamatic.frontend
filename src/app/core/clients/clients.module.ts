import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import {ClientsComponent} from './clients.component';
import {SharedModule} from '../../shared/shared.module';
import {ClientModule} from '../../modules/client/client.module';
import {AuthModule} from '../../modules/auth/auth.module';

@NgModule({
  imports: [
    SharedModule,
    ClientsRoutingModule,
    ClientModule,
    AuthModule,
  ],
  declarations: [
    ClientsComponent,
  ]
})
export class ClientsModule { }
