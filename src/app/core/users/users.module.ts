import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import {UsuariosComponent} from './usuarios.component';
import {UserModule} from '../../user/user.module';
import {AuthModule} from '../../auth/auth.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule,
    UserModule,
    AuthModule,
  ],
  declarations: [
    UsuariosComponent,
  ]
})
export class UsersModule { }
