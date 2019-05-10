import { NgModule } from '@angular/core';
import { BranchSearchComponent } from './components/branch-search/branch-search.component';
import { SharedModule } from '@app/shared/shared.module';
import { BranchDialogComponent } from './components/branch-dialog';
import { AuthModule } from '../auth/auth.module';
import { BranchItemComponent } from './components/branch-item';
import { VariousModule } from '../various/various.module';
import { ImageUploadModule } from 'ng2-imageupload';
import { MatIconModule, MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    AuthModule,
    VariousModule,
    ImageUploadModule,
    MatIconModule,
    MatProgressSpinnerModule,
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
}
