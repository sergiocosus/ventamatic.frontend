import {Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import {Branch} from '../../branch/models/branch';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})

export class InventoryComponent implements OnInit {
  branches: Branch[] = [];
  branch: Branch;


  private user;

  constructor(private authService: AuthService) {

  }

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
