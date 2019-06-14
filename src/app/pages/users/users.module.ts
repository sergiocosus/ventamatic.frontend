import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import {UsuariosComponent} from './usuarios.component';
import {UserModule} from '../../modules/user/user.module';
import {AuthModule} from '../../modules/auth/auth.module';
import {SharedModule} from '../../shared/shared.module';
import { MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule,
    UserModule,
    AuthModule,
    MatToolbarModule,
  ],
  declarations: [
    UsuariosComponent,
  ]
})
export class UsersModule { }
