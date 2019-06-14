import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '@app/api/services/user.service';
import { NotifyService } from '@app/shared/services/notify.service';
import { RoleService } from '@app/api/services/role.service';
import { BranchRole } from '@app/api/models/branch-role';
import { Role } from '@app/api/models/role';
import { Branch } from '@app/api/models/branch';
import { User } from '@app/api/models/user';
import { BranchRoleService } from '@app/api/services/branch-role.service';
import { BranchService } from '@app/api/services/branch.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as _ from 'lodash';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-role-dialog',
  templateUrl: './user-role-dialog.component.html',
  styleUrls: ['./user-role-dialog.component.scss']
})
export class UserRoleDialogComponent implements OnInit {
  branches: Branch[];

  roles: Role[] = [];
  selectedRoles: any[] = [];

  branchRoles: BranchRole[];

  messages = {
    rolesSaved: 'Los roles han sido actualizados para el usuario'
  };

  branchPermissionSelected: {
    branch_id: number;
    branch_roles: number[]
  }[];

  systemForm: FormGroup;
  branchForm: FormGroup;


  constructor(protected userService: UserService,
              protected notify: NotifyService,
              protected roleService: RoleService,
              protected branchRoleService: BranchRoleService,
              protected branchService: BranchService,
              private dialogRef: MatDialogRef<UserRoleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public user: User,
              private fb: FormBuilder) {
    this.branchForm = this.fb.group({
      branchRoles: this.fb.array([])
    });
    this.systemForm = this.fb.group({
      role_ids: [],
    });
  }

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

    this.init(this.user.id);
  }

  rolesOfBranch(branch_id: number) {
    return _.find(this.branchPermissionSelected, {branch_id}).branch_roles;
  }

  init(user_id: number) {
    this.userService.get(user_id).subscribe(
      user => {
        this.user = user;
        this.systemForm.reset({
          role_ids: _.map(user.roles, 'id')
        });

        console.log(this.branches);


        this.branches.forEach(branch => {
          (this.branchForm.get('branchRoles') as FormArray).push(this.fb.group({
            branch: [branch],
            branch_role_ids: [
              this.user.branch_roles.filter(
                branchRole => branchRole.pivot.branch_id === branch.id
              ).map(branchRole => branchRole.id)
            ],
          }));
        });
      },
      error => this.notify.serviceError(error)
    );
  }

  updateSystemRoles() {
    this.userService.putRoles(this.user, this.systemForm.getRawValue()).subscribe(
      updatedRoles => {
        this.user.roles = updatedRoles;
        this.notify.success(this.messages.rolesSaved);
      },
      error => this.notify.serviceError(error)
    );
  }

  updateBranchRoles() {
    this.userService.putBranchRoles(this.user, this.branchPermissionSelected).subscribe(
      updatedBranchRoles => {
        this.user.branch_roles = updatedBranchRoles;
        this.notify.success(this.messages.rolesSaved);
      },
      error => this.notify.serviceError(error)
    );
  }
}
