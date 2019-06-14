import { NgModule } from '@angular/core';
import { AsideNavComponent } from '@app/navigation/components/aside-nav/aside-nav.component';
import { AuthModule } from '@app/auth/auth.module';
import { SharedModule } from '@app/shared/shared.module';
import { MatListModule } from '@angular/material';

@NgModule({
  declarations: [
    AsideNavComponent,
  ],
  exports: [
    AsideNavComponent
  ],
  imports: [
    SharedModule,
    AuthModule,
    MatListModule
  ]
})
export class NavigationModule {
}
