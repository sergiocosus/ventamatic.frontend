import {ModuleWithProviders, NgModule} from '@angular/core';
import { BranchSearchComponent } from './branch-search/branch-search.component';
import {SharedModule} from '../shared/shared.module';
import {BranchDialogComponent} from './components/branch-dialog/branch-dialog.component';
import {AuthModule} from '../auth/auth.module';
import {BranchService} from './services/branch.service';
import {BranchItemComponent} from './components/branch-item/branch-item.component';
import {VariousModule} from '../various/various.module';

@NgModule({
  imports: [
    SharedModule,
    AuthModule,
    VariousModule,
  ],
  declarations: [
    BranchSearchComponent,
    BranchDialogComponent,
    BranchItemComponent,
  ],
  entryComponents: [
    BranchDialogComponent,
  ],
  exports: [
    BranchSearchComponent,
    BranchDialogComponent,
    BranchItemComponent,
  ]
})
export class BranchModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BranchModule,
      providers: [
        BranchService,
      ],
    };
  }
}
