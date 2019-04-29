import { NgModule } from '@angular/core';

import { BranchesRoutingModule } from './branches-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {BranchesComponent} from './branches.component';
import {BranchModule} from '../../modules/branch/branch.module';

@NgModule({
  imports: [
    SharedModule,
    BranchesRoutingModule,
    BranchModule,
  ],
  declarations: [BranchesComponent]
})
export class BranchesModule { }
