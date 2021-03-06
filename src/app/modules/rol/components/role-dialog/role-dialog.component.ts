import {Component, OnInit} from '@angular/core';
import {Role} from '../../../api/models/role';
import {RoleService} from '../../../api/services/role.service';
import {MatDialogRef} from '@angular/material';
import {CrudModalComponent} from '../../../../shared/components/crud-modal/crud-modal.component';
import {NotifyService} from '../../../../shared/services/notify.service';
import {Permission} from '../../../api/models/permission';
import {PermissionService} from '../../../api/services/permission.service';

@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.scss']
})
export class RoleDialogComponent extends CrudModalComponent implements OnInit {
  name = 'Rol';
  role: Role;
  permissions: Permission[] = [];
  permissionList: {id: number; name: string, checked: boolean}[] = [];

  constructor(protected notify: NotifyService,
              private roleService: RoleService,
              private permissionService: PermissionService,
              protected dialogRef: MatDialogRef<RoleDialogComponent>) {
    super(notify, dialogRef);
  }

  ngOnInit() {

  }

  initCreate() {
    this.role = new Role();
    this.permissionService.getAllCached().subscribe(
        permissions => this.fillCreatePermissionList(permissions)
    );
    super.initCreate();
  }

  initUpdate(role: Role) {
    this.roleService.get(role.id).subscribe(
      obtaniedRole => {
        this.role = obtaniedRole;
        this.permissionService.getAllCached().subscribe(
            permissions => this.fillUpdatePermissionList(obtaniedRole, permissions)
        );
      },
      error => this.notify.serviceError(error)
    );

    super.initUpdate();
  }

  fillCreatePermissionList(permissions: Permission[]) {
    this.permissionList = permissions.map(
        permission => ({
          id: permission.id,
          name: permission.display_name,
          checked: false
        })
    );
  }

  fillUpdatePermissionList(role: Role, permissions: Permission[]) {
    this.permissionList = permissions.map(
        permission => ({
          id: permission.id,
          name: permission.display_name,
          checked: !!role.permissions.find(
              (rolePermission: Permission) => permission.id === rolePermission.id
          )
        })
    );
  }

  initDelete(role: Role) {
    this.role = role;
    super.initDelete(role);
  }

  create() {
    this.appendData();

    this.roleService.post(this.role).subscribe(
      role => this.createdSuccess(role),
      error => this.notify.serviceError(error)
    );
  }

  update() {
    this.appendData();

    this.roleService.put(this.role).subscribe(
      role => this.updatedSuccess(role),
      error => this.notify.serviceError(error)
    );
  }

  delete() {
    this.roleService.delete(this.role.id).subscribe(
      response => this.deletedSuccess(this.role),
      error => this.notify.serviceError(error)
    );
  }

  appendData() {
    this.role.permissions = [];
    this.permissionList.forEach(
      item => {
        if (item.checked) {
          this.role.permissions.push(item.id);
        }
      }
    );
  }
}
