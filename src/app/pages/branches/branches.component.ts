import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BranchDialogComponent } from '@app/branch/components/branch-dialog';
import { Branch } from '@app/api/models/branch';
import { BranchService } from '@app/api/services/branch.service';
import { NotifyService } from '@app/shared/services/notify.service';

@Component({
  selector: 'app-sucursales',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {
  branches: Branch[];

  constructor(private branchService: BranchService,
              private notify: NotifyService,
              private dialog: MatDialog) {
  }

  ngOnInit(): any {
    this.branchService.getAllCached().subscribe(
      branches => this.branches = branches,
      error => this.notify.serviceError(error)
    );
  }

  update(branch: Branch) {
    this.dialog.open(BranchDialogComponent, {data: branch});
  }

  created(branch: Branch) {
    this.branches.unshift(branch);
  }

  deleted(branch: Branch) {
    const index = this.branches.indexOf(branch);
    if (index > -1) {
      this.branches.splice(index, 1);
    }
  }
}
