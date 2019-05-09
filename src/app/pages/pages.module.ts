import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '@app/auth/auth.module';
import { SidebarModule } from 'ng-sidebar';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    SharedModule,
    AuthModule,
    PagesRoutingModule,
    SidebarModule,
    CoreModule,
  ],
  declarations: [
    PagesComponent,
  ]
})
export class PagesModule {
}
