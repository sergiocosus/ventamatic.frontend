import {ModuleWithProviders, NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {EndScheduleDialogComponent} from './componets/end-schedule-dialog/end-schedule-dialog.component';
import {UserService} from './services/user.service';
import {UserSearchComponent} from './componets/user-search/user-search.component';
import {UserDialogComponent} from './componets/user-dialog/user-dialog.component';
import {UserItemComponent} from './componets/user-item/user-item.component';
import {UserRoleDialogComponent} from './componets/user-role-dialog/user-role-modal.component';
import {VariousModule} from '../various/various.module';
import {AuthModule} from '../auth/auth.module';
import {ScheduleService} from './services/schedule.service';

@NgModule({
  imports: [
    SharedModule,
    VariousModule,
    AuthModule,
  ],
  declarations: [
    UserSearchComponent,
    EndScheduleDialogComponent,
    UserDialogComponent,
    UserItemComponent,
    UserRoleDialogComponent,
    UserSearchComponent,
  ],
  entryComponents: [
    EndScheduleDialogComponent,
    UserRoleDialogComponent,
    UserDialogComponent,
  ],
  exports: [
    UserSearchComponent,
    EndScheduleDialogComponent,
    UserDialogComponent,
    UserItemComponent,
    UserRoleDialogComponent,
    UserSearchComponent,
  ]
})
export class UserModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserModule,
      providers: [
        UserService,
        ScheduleService,
      ],
    };
  }
}
