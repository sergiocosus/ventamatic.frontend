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
import { MatCardModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { FinishedScheduleDialogComponent } from './components/finished-schedule-dialog/finished-schedule-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    VariousModule,
    AuthModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    UserSearchComponent,
    EndScheduleDialogComponent,
    UserDialogComponent,
    UserItemComponent,
    UserRoleDialogComponent,
    PasswordDialogComponent,
    FinishedScheduleDialogComponent,
  ],
  entryComponents: [
    EndScheduleDialogComponent,
    UserRoleDialogComponent,
    UserDialogComponent,
    PasswordDialogComponent,
    FinishedScheduleDialogComponent,
  ],
  exports: [
    UserSearchComponent,
    EndScheduleDialogComponent,
    UserDialogComponent,
    UserItemComponent,
    UserRoleDialogComponent,
    PasswordDialogComponent,
  ]
})
export class UserModule {

}
