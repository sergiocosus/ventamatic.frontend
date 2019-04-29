import { NgModule } from '@angular/core';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { AsideNavComponent } from './components/aside-nav/aside-nav.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { AuthModule } from '@app/auth/auth.module';

@NgModule({
  declarations: [SidenavComponent, AsideNavComponent, TopBarComponent],
  imports: [
    SharedModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    AuthModule,
  ],
  exports: [
    SidenavComponent,
  ]
})
export class CoreModule {
}
