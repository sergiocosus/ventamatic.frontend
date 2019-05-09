import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { EndScheduleDialogComponent } from './components/end-schedule-dialog/end-schedule-dialog.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { UserRoleDialogComponent } from './components/user-role-dialog/user-role-dialog.component';
import { VariousModule } from '../various/various.module';
import { AuthModule } from '../auth/auth.module';
import { PasswordDialogComponent } from './components/password-dialog/password-dialog.component';
import { MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    VariousModule,
    AuthModule,
    MatCardModule,
  ],
  declarations: [
    UserSearchComponent,
    EndScheduleDialogComponent,
    UserDialogComponent,
    UserItemComponent,
    UserRoleDialogComponent,
    UserSearchComponent,
    PasswordDialogComponent,
  ],
  entryComponents: [
    EndScheduleDialogComponent,
    UserRoleDialogComponent,
    UserDialogComponent,
    PasswordDialogComponent,
  ],
  exports: [
    UserSearchComponent,
    EndScheduleDialogComponent,
    UserDialogComponent,
    UserItemComponent,
    UserRoleDialogComponent,
    UserSearchComponent,
    PasswordDialogComponent,
  ]
})
export class UserModule {

}
