import { NgModule } from '@angular/core';
import { BranchSearchComponent } from './branch-search/branch-search.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    BranchSearchComponent,
  ],
  exports: [
    BranchSearchComponent,
  ]
})
export class BranchModule { }
