import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {NotifyService} from '../../../shared/services/notify.service';
import {RoleService} from '../../../rol/services/role.service';
import {BranchRole} from '../../../rol/classes/branch-role';
import {Role} from '../../../rol/classes/role';
import {Branch} from '../../../branch/models/branch';
import {User} from '../../classes/user';
import {BranchRoleService} from '../../../rol/services/branch-role.service';
import {BranchService} from '../../../branch/services/branch.service';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-user-role-dialog',
  templateUrl: './user-role-dialog.component.html',
  styleUrls: ['./user-role-dialog.component.scss']
})
export class UserRoleDialogComponent implements OnInit {
  user: User;
  branches: Branch[];

  roles: Role[] = [];
  roleItems: any[] = [];
  selectedRoleItems: any[] = [];

  branchRoleItems: any[] = [];
  selectedBranchRoleItems: any[][] = [];

  messages = {
    rolesSaved: 'Los roles han sido actualizados para el usuario'
  };

  branchRoles: BranchRole[];

  constructor(protected userService: UserService,
              protected notify: NotifyService,
              protected roleService: RoleService,
              protected branchRoleService: BranchRoleService,
              protected branchService: BranchService,
              private dialogRef: MdDialogRef<UserRoleDialogComponent>) { }

  ngOnInit() {
    this.roleService.getAll().subscribe(
      roles => {
        this.roles = roles;
        this.roleItems = this.roles.map(
          (role: Role) => ({text: role.display_name, id: role.id})
        );
      }
    );

    this.branchService.getAll().subscribe(
      branches => this.branches = branches
    );

    this.branchRoleService.getAll().subscribe(
      branchRoles => {
        this.branchRoles = branchRoles;
        this.branchRoleItems = this.branchRoles.map(
          (branchRole: BranchRole) => ({text: branchRole.display_name, id: branchRole.id})
        );
      }
    );
  }

  init(user_id: number) {
    this.userService.get(user_id).subscribe(
      user => {
        this.user = user;

        this.selectedRoleItems = user.roles.map(
          (role: Role) => ({text: role.display_name, id: role.id})
        );

        this.branches.forEach(
          branch => {
            const filteredBranchRoles = this.user.branch_roles.filter(
              branchRole => branchRole.pivot.branch_id === branch.id
            );
            this.selectedBranchRoleItems.push(
              filteredBranchRoles.map(
                (branchRole: BranchRole) => ({text: branchRole.display_name, id: branchRole.id})
              )
            );
          }
        );
      },
      error => this.notify.serviceError(error)
    );
  }

  updateSystemRoles() {
    const roles = this.selectedRoleItems.map(
      item => item.id
    );

    this.userService.putRoles(this.user, roles).subscribe(
      updatedRoles => {
        this.user.roles = updatedRoles;
        this.notify.success(this.messages.rolesSaved);
      },
      error => this.notify.serviceError(error)
    );
  }

  updateBranchRoles() {
    const branchRoles = [];
    for (let i = 0; i < this.branches.length; i++) {
      const branches = {
        branch_id : this.branches[i].id,
        branch_roles: []
      };
      branches.branch_roles = this.selectedBranchRoleItems[i].map(
        item => item.id
      );
      branchRoles.push(branches);
    }


    this.userService.putBranchRoles(this.user, branchRoles).subscribe(
      updatedBranchRoles => {
        this.user.branch_roles = updatedBranchRoles;
        this.notify.success(this.messages.rolesSaved);
      },
      error => this.notify.serviceError(error)
    );
  }

  clear() {
    this.user = null;
    this.selectedRoleItems = [];
    this.selectedBranchRoleItems = [];
  }

  close() {
    this.dialogRef.close();
  }
}
