import { Component, OnInit } from '@angular/core';
import { Branch } from "../../+sucursales/shared/branch";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'select-branch',
  templateUrl: 'select-branch.component.html',
  styleUrls: ['select-branch.component.scss'],
})
export class InventorySelectBranch implements OnInit {
  branches:Branch[] = [];
  private user;

  constructor(private authService:AuthService) {}

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
