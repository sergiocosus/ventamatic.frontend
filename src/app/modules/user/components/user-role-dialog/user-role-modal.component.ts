import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../api/services/user.service';
import {NotifyService} from '../../../../shared/services/notify.service';
import {RoleService} from '../../../api/services/role.service';
import {BranchRole} from '../../../api/models/branch-role';
import {Role} from '../../../api/models/role';
import {Branch} from '../../../api/models/branch';
import {User} from '../../../api/models/user';
import {BranchRoleService} from '../../../api/services/branch-role.service';
import {BranchService} from '../../../api/services/branch.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-user-role-dialog',
  templateUrl: './user-role-dialog.component.html',
  styleUrls: ['./user-role-dialog.component.scss']
})
export class UserRoleDialogComponent implements OnInit {
  user: User;
  branches: Branch[];

  roles: Role[] = [];
  selectedRoles: any[] = [];

  branchRoles: BranchRole[];
  selectedBranchRoles: any[][] = [];

  messages = {
    rolesSaved: 'Los roles han sido actualizados para el usuario'
  };


  constructor(protected userService: UserService,
              protected notify: NotifyService,
              protected roleService: RoleService,
              protected branchRoleService: BranchRoleService,
              protected branchService: BranchService,
              private dialogRef: MatDialogRef<UserRoleDialogComponent>) { }

  ngOnInit() {
    this.roleService.getAllCached().subscribe(
      roles => this.roles = roles
    );

    this.branchService.getAllCached().subscribe(
      branches => this.branches = branches
    );

    this.branchRoleService.getAllCached().subscribe(
      branchRoles => this.branchRoles = branchRoles
    );
  }

  init(user_id: number) {
    this.userService.get(user_id).subscribe(
      user => {
        this.user = user;

        this.selectedRoles = user.roles.map(
          rolesOfUser => this.roles.find(
            role => role.id === rolesOfUser.id
          )
        );

        this.branches.forEach(
          branch => {
            const filteredBranchRoles = this.user.branch_roles.filter(
              branchRole => branchRole.pivot.branch_id === branch.id
            );
            this.selectedBranchRoles.push(
              filteredBranchRoles.map(
                branchRolesOfUser => this.branchRoles.find(
                  branchRole => branchRole.id === branchRolesOfUser.id
                )
              )
            );
          }
        );
      },
      error => this.notify.serviceError(error)
    );
  }

  updateSystemRoles() {
    const roles = this.selectedRoles.map(
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

      console.log(this.selectedBranchRoles);
      branches.branch_roles = this.selectedBranchRoles[i].map(
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
    this.selectedRoles = [];
    this.selectedBranchRoles = [];
  }

  close() {
    this.dialogRef.close();
  }
}
