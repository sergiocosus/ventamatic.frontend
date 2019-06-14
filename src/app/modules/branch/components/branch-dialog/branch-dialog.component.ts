import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Branch } from '@app/api/models/branch';
import { BranchService } from '@app/api/services/branch.service';
import { CrudModalComponent } from '@app/shared/components/crud-modal/crud-modal.component';
import { NotifyService } from '@app/shared/services/notify.service';
import { ImageResult } from 'ng2-imageupload';

@Component({
  selector: 'app-branch-dialog',
  templateUrl: './branch-dialog.component.html',
  styleUrls: ['./branch-dialog.component.scss'],
})
export class BranchDialogComponent extends CrudModalComponent {
  name = 'Sucursal';
  src: string;
  image: string;

  constructor(protected notify: NotifyService,
              protected branchService: BranchService,
              protected dialogRef: MatDialogRef<BranchDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public branch: Branch) {
    super(notify, dialogRef);
    this.src = this.branch.image_url;
    this.initUpdate();
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
