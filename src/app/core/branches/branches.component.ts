import { Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {BranchDialogComponent} from '../../branch/components/branch-dialog/branch-dialog.component';
import {Branch} from '../../branch/models/branch';
import {BranchService} from '../../branch/services/branch.service';
import {NotifyService} from '../../shared/services/notify.service';

@Component({
  selector: 'app-sucursales',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {
  branches: Branch[];

  constructor(private branchService: BranchService,
              private notify: NotifyService,
              private dialog: MatDialog) {}

  ngOnInit(): any {
    this.branchService.getAllCached().subscribe(
      branches => this.branches = branches,
      error => this.notify.serviceError(error)
    );
  }

  update(branch: Branch) {
    const dialog = this.dialog.open(BranchDialogComponent);
    dialog.componentInstance.initUpdate(branch);
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
