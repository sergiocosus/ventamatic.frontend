import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import {LoginComponent} from './login.component';
import {SharedModule} from '@app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent,
  ]
})
export class LoginModule { }
