import { NgModule } from '@angular/core';
import { MyAccountRoutingModule } from './my-account-routing.module';
import {MyAccountComponent} from './my-account.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    MyAccountRoutingModule
  ],
  declarations: [
    MyAccountComponent
  ]
})
export class MyAccountModule { }
