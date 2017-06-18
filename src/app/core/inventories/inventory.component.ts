import {Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import {Branch} from '../../branch/models/branch';
import {FormBuilder, FormControl} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})

export class InventoryComponent implements OnInit {
  branches: Branch[] = [];
  branch: Branch;

  branchControl = new FormControl();

  private user;

  constructor(private authService: AuthService,
              private router: Router) {
    this.branchControl.valueChanges.subscribe(
      branch => {
        if (!branch) { return; }
        console.log(branch);
        this.router.navigateByUrl('/inventario/' + branch.id);
      }
    );
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
