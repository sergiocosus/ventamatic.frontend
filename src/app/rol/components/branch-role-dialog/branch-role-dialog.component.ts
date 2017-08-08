import {Component, OnInit} from '@angular/core';
import {BranchRoleService} from '../../services/branch-role.service';
import {MdDialogRef} from '@angular/material';
import {CrudModalComponent} from '../../../shared/components/crud-modal/crud-modal.component';
import {BranchRole} from '../../classes/branch-role';
import {NotifyService} from '../../../shared/services/notify.service';
import {BranchPermission} from '../../../auth/classes/branch-permission';
import {BranchPermissionService} from '../../../auth/services/branch-permission.service';

@Component({
  selector: 'app-branch-role-dialog',
  templateUrl: './branch-role-dialog.component.html',
  styleUrls: ['./branch-role-dialog.component.scss']
})
export class BranchRoleDialogComponent extends CrudModalComponent implements OnInit {
  name = 'Rol de sucursal';

  branchRole: BranchRole;
  branchPermissionList: {id: number; name: string, checked: boolean}[] = [];

  constructor(protected notify: NotifyService,
              private branchRoleService: BranchRoleService,
              private branchPermissionService: BranchPermissionService,
              protected dialogRef: MdDialogRef<BranchRoleDialogComponent>) {
    super(notify, dialogRef);
  }

  ngOnInit() {
  }

  initCreate() {
    this.branchRole = new BranchRole();
    this.branchPermissionService.getAllCached().subscribe(
        permissions => this.fillCreateList(permissions)
    );

    super.initCreate();
  }

  initUpdate(branchRole: BranchRole) {
    this.branchRoleService.get(branchRole.id).subscribe(
      updatedBranchRole => {
        this.branchRole = updatedBranchRole;
        this.branchPermissionService.getAllCached().subscribe(
            permissions =>  this.fillUpdateList(updatedBranchRole, permissions)
        );
      }
    );

    super.initUpdate();
  }

  fillCreateList(branchPermissions: BranchPermission[]) {
    this.branchPermissionList = branchPermissions.map(
        permission => ({
          id: permission.id,
          name: permission.display_name,
          checked: false
        })
    );
  }

  fillUpdateList(branchRole, branchPermissions: BranchPermission[]) {
    this.branchPermissionList = branchPermissions.map(
        permission => {
          return {
            id: permission.id,
            name: permission.display_name,
            checked: branchRole.branch_permissions.find(
                rolePermission => permission.id === rolePermission.id
            ) ? true : false
          };

        }
    );
  }


  initDelete(branchRole: BranchRole) {
    this.branchRole = branchRole;
    super.initDelete(branchRole);
  }

  create() {
    this.appendData();

    this.branchRoleService.post(this.branchRole).subscribe(
      role => this.createdSuccess(role),
      error => this.notify.serviceError(error)
    );
  }

  update() {
    this.appendData();

    this.branchRoleService.put(this.branchRole).subscribe(
      role => this.updatedSuccess(role),
      error => this.notify.serviceError(error)
    );
  }

  delete() {
    this.branchRoleService.delete(this.branchRole.id).subscribe(
      response => this.deletedSuccess(this.branchRole),
      error => this.notify.serviceError(error)
    );
  }

  appendData() {
    this.branchRole.branch_permissions = [];
    this.branchPermissionList.forEach(
      item => {
        if (item.checked) {
          this.branchRole.branch_permissions.push(item.id);
        }
      }
    );
  }
}
