import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {MainComponent} from './main.component';
import {AuthModule} from '../../auth/auth.module';

@NgModule({
  imports: [
    SharedModule,
    AuthModule,
    MainRoutingModule
  ],
  declarations: [
    MainComponent,
  ]
})
export class MainModule { }
