import { NgModule } from '@angular/core';
import { CoreRoutingModule } from './core-routing.module';
import {AsideNavComponent} from './shared/aside-nav/aside-nav.component';
import {TopBarComponent} from './shared/top-bar/top-bar.component';
import {CoreComponent} from './core.component';
import {SharedModule} from '../shared/shared.module';
import {AuthModule} from '../modules/auth/auth.module';
import {SidebarModule} from 'ng-sidebar';

@NgModule({
  imports: [
    SharedModule,
    AuthModule,
    CoreRoutingModule,
    SidebarModule,
  ],
  declarations: [
    AsideNavComponent,
    TopBarComponent,
    CoreComponent,
  ]
})
export class CoreModule { }
