import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { UserCanDirective } from './directives/user-can.directive';
import { UserCanInBranchDirective } from './directives/user-can-in-branch.directive';

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
}
