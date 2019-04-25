import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { BranchRoleDialogComponent } from './components/branch-role-dialog/branch-role-dialog.component';
import { RoleDialogComponent } from './components/role-dialog/role-dialog.component';
import { BranchRoleService } from '@app/api/services/branch-role.service';
import { RoleService } from '@app/api/services/role.service';
import { AuthModule } from '../auth/auth.module';

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
}
