import {Component, OnInit, ViewChild, Output} from '@angular/core';
import {RoleService} from "../../services/role.service";
import {PermissionService} from "../../../../shared/security/permission.service";
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {CrudModalComponent} from "../../../../components/crud-modal/crud-modal.component";
import { Role } from "../../classes/role";
import { Permission } from "../../../../shared/security/permission";
import {NotifyService} from "../../../../services/notify.service";

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.scss']
})
export class RoleModalComponent extends CrudModalComponent {
  @ViewChild(ModalComponent) protected modal:ModalComponent;

  @Output() created;
  @Output() updated;
  @Output() deleted;

  role: Role;

  permissions:Permission[] = [];
  permissionItems:any[] = [];
  selectedPermissionItems:any[] = [];

  constructor(protected notify:NotifyService,
              private roleService:RoleService,
              private permissionService:PermissionService) {
    super(notify);
  }

  ngOnInit() {
    this.permissionService.getAll().subscribe(
      permissions => {
        this.permissions = permissions;
        this.permissionItems = this.permissions.map(
          (permission:Permission) => {
            return {text:permission.display_name, id:permission.id};
          }
        )
      }
    )
  }

  openCreate(){
    this.role = new Role();
    super.openCreate();
  }

  openUpdate(role:Role){
    this.roleService.get(role.id).subscribe(
      role => {
        this.role = role;
        this.selectedPermissionItems = role.permissions.map(
          permission => {
            return {id:permission.id, text:permission.display_name};
          }
        );
      }
    );

    super.openUpdate();
  }

  openDelete(role:Role){
    this.role = role;
    super.openDelete(role)
  }

  create() {
    this.appendData();

    this.roleService.post(this.role).subscribe(
      role => this.createdSuccess(role)
    );
  }

  update() {
    this.appendData();

    this.roleService.put(this.role).subscribe(
      role => this.updatedSuccess(role)
    );
  }

  delete() {
    this.roleService.delete(this.role.id).subscribe(
      response => this.deletedSuccess(this.role)
    );
  }

  appendData() {
    this.role.permissions = this.selectedPermissionItems.map(
      item => item.id
    );
  }

  closed(){
    this.role = null;
    this.selectedPermissionItems = [];
  }

}
