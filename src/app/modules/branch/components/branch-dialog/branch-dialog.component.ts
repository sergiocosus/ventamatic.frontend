import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Branch} from '../../../api/models/branch';
import {BranchService} from '../../../api/services/branch.service';
import {CrudModalComponent} from '../../../../shared/components/crud-modal/crud-modal.component';
import {NotifyService} from '../../../../shared/services/notify.service';
import {ImageResult} from 'ng2-imageupload';

@Component({
  selector: 'app-branch-dialog',
  templateUrl: './branch-dialog.component.html',
  styleUrls: ['./branch-dialog.component.scss'],
})
export class BranchDialogComponent extends CrudModalComponent {
  branch: Branch;
  name = 'Sucursal';
  src: string;
  image: string;

  constructor(protected notify: NotifyService,
              protected branchService: BranchService,
              protected dialogRef: MatDialogRef<BranchDialogComponent>) {
    super(notify, dialogRef);
  }

  initUpdate(branch: Branch) {
    this.branch = branch;
    this.src = this.branch.image_url;
    super.initUpdate(branch);
  }

  update() {
    this.beforeUpdate();
    this.branchService.put(this.branch).subscribe(
      branch => {
        this.updatedSuccess(branch);
        this.branchService.getAllCached(undefined, true);
      },
      error => this.notify.serviceError(error)
    );
  }

  create() {
  }

  delete() {
  }

  beforeUpdate() {
    if (this.image) {
      this.branch.image_base64 = this.image;
    }
  }

  selected(imageResult: ImageResult) {
    this.src = imageResult.dataURL;
    this.image = this.src ? this.src.split(',')[1] : null;
  }
}
