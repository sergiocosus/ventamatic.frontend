import { NgModule } from '@angular/core';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { AuthModule } from '@app/auth/auth.module';
import { UserModule } from '@app/user/user.module';
import { NavigationModule } from '@app/navigation/navigation.module';

@NgModule({
  declarations: [SidenavComponent, TopBarComponent],
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
    UserModule,
    NavigationModule,
  ],
  exports: [
    SidenavComponent,
  ]
})
export class CoreModule {
}
