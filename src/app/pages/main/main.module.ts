import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {MainComponent} from './main.component';
import {AuthModule} from '../../modules/auth/auth.module';
import { NavigationModule } from '@app/navigation/navigation.module';
import { MatListModule } from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    AuthModule,
    MainRoutingModule,
    NavigationModule,
    MatListModule
  ],
  declarations: [
    MainComponent,
  ]
})
export class MainModule { }
