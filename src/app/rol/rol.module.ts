import {ModuleWithProviders, NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {BranchRoleDialogComponent} from './components/branch-role-dialog/branch-role-dialog.component';
import {RoleDialogComponent} from './components/role-dialog/role-dialog.component';
import {BranchRoleService} from './services/branch-role.service';
import {RoleService} from './services/role.service';
import {AuthModule} from '../auth/auth.module';

@NgModule({
  imports: [
    SharedModule,
    AuthModule,
  ],
  declarations: [
    BranchRoleDialogComponent,
    RoleDialogComponent,
  ],
  entryComponents: [
    BranchRoleDialogComponent,
    RoleDialogComponent,
  ],
  providers: [
    BranchRoleService,
    RoleService,
  ],
  exports: [
    BranchRoleDialogComponent,
    RoleDialogComponent,
  ]
})
export class RolModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RolModule,
      providers: [
        BranchRoleService,
        RoleService,
      ],
    };
  }
}
