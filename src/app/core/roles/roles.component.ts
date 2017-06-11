import {Component, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import {RoleService} from '../../rol/services/role.service';
import {BranchRoleService} from '../../rol/services/branch-role.service';
import {NotifyService} from '../../shared/services/notify.service';
import {BranchRole} from '../../rol/classes/branch-role';
import {Role} from '../../rol/classes/role';
import {RoleDialogComponent} from '../../rol/components/role-dialog/role-dialog.component';
import {BranchRoleDialogComponent} from '../../rol/components/branch-role-dialog/branch-role-dialog.component';

@Component({
  selector: 'app-roles',
  templateUrl: 'roles.component.html',
  styleUrls: ['roles.component.scss']
})
export class RolesComponent implements OnInit {
  roles: Role[];
  branchRoles: BranchRole[];

  constructor(private roleService: RoleService,
              private branchRoleService: BranchRoleService,
              private notify: NotifyService,
              private dialog: MdDialog) {}

  ngOnInit() {
    this.roleService.getAll().subscribe(
      roles => {
        this.roles = roles;
      },
      error => this.notify.serviceError(error)
    );

    this.branchRoleService.getAll().subscribe(
      branchRoles => this.branchRoles = branchRoles,
      error => this.notify.serviceError(error)
    );
  }

  clickUpdate(role: Role) {
    this.update(role);
  }

  clickDelete($event, role: Role) {
    $event.preventDefault();
    $event.stopPropagation();

    this.delete(role);
  }

  update(role: Role) {
    const dialog = this.dialog.open(RoleDialogComponent);
    dialog.componentInstance.initUpdate(role);
    dialog.componentInstance.updated.subscribe(updatedRole => {
      for (let i = 0; i < this.roles.length; i++) {
        if (updatedRole.id === this.roles[i].id) {
          this.roles[i] = role;
        }
      }
    });
  }

  create() {
    const dialog = this.dialog.open(RoleDialogComponent);
    dialog.componentInstance.initCreate();
    dialog.componentInstance.created.subscribe(createdRole => {
      this.roles.push(createdRole);
    });
  }

  delete(role: Role) {
    const dialog = this.dialog.open(RoleDialogComponent);
    dialog.componentInstance.initDelete(role);
    dialog.componentInstance.deleted.subscribe(deletedRole => {
      const index = this.roles.indexOf(deletedRole);
      if (index > -1) {
        this.roles.splice(index, 1);
      }
    });
  }


  updateBranchPermission(branchRole: BranchRole) {
    const dialog = this.dialog.open(BranchRoleDialogComponent);
    dialog.componentInstance.initUpdate(branchRole);
    dialog.componentInstance.updated.subscribe(updatedBranchRole => {
      for (let i = 0; i < this.branchRoles.length; i++) {
        if (updatedBranchRole.id === this.branchRoles[i].id) {
          this.branchRoles[i] = updatedBranchRole;
        }
      }
    });
  }

  createBranchPermission() {
    const dialog = this.dialog.open(BranchRoleDialogComponent);
    dialog.componentInstance.initCreate();

    dialog.componentInstance.created.subscribe(createdBranchRole => {
      this.branchRoles.push(createdBranchRole);
    });
  }

  deleteBranchPermission(branchRole: BranchRole) {
    const dialog = this.dialog.open(BranchRoleDialogComponent);
    dialog.componentInstance.initDelete(branchRole);

    dialog.componentInstance.deleted.subscribe(deletedBranchRole => {
      const index = this.branchRoles.indexOf(deletedBranchRole);
      if (index > -1) {
        this.branchRoles.splice(index, 1);
      }
    });
  }
}
