import { Component } from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {Branch} from '../../models/branch';
import {BranchService} from '../../services/branch.service';
import {CrudModalComponent} from '../../../shared/components/crud-modal/crud-modal.component';
import {NotifyService} from '../../../shared/services/notify.service';

@Component({
  selector: 'app-branch-modal',
  templateUrl: './branch-dialog.component.html',
  styleUrls: ['./branch-dialog.component.scss'],
})
export class BranchDialogComponent extends CrudModalComponent {
  branch: Branch;
  name = 'Sucursal';

  constructor(protected notify: NotifyService,
              protected branchService: BranchService,
              protected dialogRef: MdDialogRef<BranchDialogComponent>) {
    super(notify, dialogRef);
  }

  initUpdate(branch: Branch) {
    this.branch = branch;
    super.initUpdate(branch);
  }

  update() {
    this.branchService.put(this.branch).subscribe( user => {
      this.updatedSuccess(user);
    });
  }

  create() {
  }

  delete() {
  }
}
