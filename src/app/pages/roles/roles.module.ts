import { NgModule } from '@angular/core';
import { RolesRoutingModule } from './roles-routing.module';
import {SharedModule} from '@app/shared/shared.module';
import {RolesComponent} from './roles.component';
import {AuthModule} from '@app/auth/auth.module';
import {VariousModule} from '@app/various/various.module';
import { MatToolbarModule } from '@angular/material';
import { RolModule } from '@app/rol/rol.module';

@NgModule({
  imports: [
    SharedModule,
    AuthModule,
    RolesRoutingModule,
    VariousModule,
    MatToolbarModule,
    RolModule,
  ],
  declarations: [
    RolesComponent,
  ]
})
export class RolesModule { }
