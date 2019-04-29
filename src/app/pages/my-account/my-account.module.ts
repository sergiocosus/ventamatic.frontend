import { NgModule } from '@angular/core';
import { MyAccountRoutingModule } from './my-account-routing.module';
import {MyAccountComponent} from './my-account.component';
import {SharedModule} from '../../shared/shared.module';
import {UserModule} from '../../modules/user/user.module';

@NgModule({
  imports: [
    SharedModule,
    MyAccountRoutingModule,
    UserModule,
  ],
  declarations: [
    MyAccountComponent
  ]
})
export class MyAccountModule { }
