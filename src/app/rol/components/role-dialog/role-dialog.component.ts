import {Component, OnInit} from '@angular/core';
import {Role} from '../../classes/role';
import {RoleService} from '../../services/role.service';
import {MdDialogRef} from '@angular/material';
import {CrudModalComponent} from '../../../shared/components/crud-modal/crud-modal.component';
import {NotifyService} from '../../../shared/services/notify.service';
import {Permission} from '../../../auth/classes/permission';
import {PermissionService} from '../../../auth/services/permission.service';

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
              protected dialogRef: MdDialogRef<RoleDialogComponent>) {
    super(notify, dialogRef);
  }

  ngOnInit() {
    this.permissionService.getAll().subscribe(
      permissions =>  this.permissions = permissions
    );
  }

  initCreate() {
    this.role = new Role();
    this.permissionList = this.permissions.map(
      permission => ({
        id: permission.id,
        name: permission.display_name,
        checked: false
      })
    );

    super.initCreate();
  }

  initUpdate(role: Role) {
    this.roleService.get(role.id).subscribe(
      obtaniedRole => {
        this.role = obtaniedRole;
        this.permissionList = this.permissions.map(
          permission => ({
            id: permission.id,
            name: permission.display_name,
            checked: !!obtaniedRole.permissions.find(
              rolePermission => permission.id === rolePermission.id
            )
          })
        );
      },
      error => this.notify.serviceError(error)
    );

    super.initUpdate();
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
