import { Component, HostBinding, OnInit } from '@angular/core';
import {AuthService} from '../../../../modules/auth/services/auth.service';
import {Branch} from '../../../../modules/api/models/branch';

@Component({
  selector: 'app-select-branch',
  templateUrl: './select-branch.component.html',
  styleUrls: ['./select-branch.component.scss'],
})
export class SelectBranchComponent implements OnInit {
  branches: Branch[] = [];
  private user;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadBranches();
  }

  loadBranches() {
    this.authService.getLoggedUser().subscribe(
      user => {
        this.user = user;
        this.branches = user.getBranchesWithPermission('inventory-get');
      }
    );
  }

}
