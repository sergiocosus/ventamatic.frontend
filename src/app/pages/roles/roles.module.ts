import { NgModule } from '@angular/core';
import { RolesRoutingModule } from './roles-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {RolesComponent} from './roles.component';
import {AuthModule} from '../../modules/auth/auth.module';
import {VariousModule} from '../../modules/various/various.module';

@NgModule({
  imports: [
    SharedModule,
    AuthModule,
    RolesRoutingModule,
    VariousModule,
  ],
  declarations: [
    RolesComponent,
  ]
})
export class RolesModule { }
