import {ModuleWithProviders, NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {AuthService} from './services/auth.service';
import {NoAuthGuardService} from './services/no-auth-guard.service';
import {AuthGuardService} from './services/auth-guard.service';
import {UserCanDirective} from './directives/user-can.directive';
import {UserCanInBranchDirective} from './directives/user-can-in-branch.directive';
import {UserModule} from '../user/user.module';
import {BranchPermissionService} from './services/branch-permission.service';
import {PermissionService} from './services/permission.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    UserCanDirective,
    UserCanInBranchDirective,
  ],
  exports: [
    UserCanDirective,
    UserCanInBranchDirective,
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        AuthGuardService,
        NoAuthGuardService,
        BranchPermissionService,
        PermissionService,
      ],
    };
  }
}
