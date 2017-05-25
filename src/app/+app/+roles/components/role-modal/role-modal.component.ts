import {Component} from '@angular/core';
import {RoleService} from "../../services/role.service";
import {PermissionService} from "../../../../shared/security/permission.service";
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
  name = 'Rol';

  role: Role;

  permissions:Permission[] = [];
  permissionList:{id:number; name:string, checked:boolean}[] = [];

  constructor(protected notify:NotifyService,
              private roleService:RoleService,
              private permissionService:PermissionService) {
    super(notify);
  }

  ngOnInit() {
    this.permissionService.getAll().subscribe(
      permissions =>  this.permissions = permissions
    )
  }

  openCreate(){
    this.role = new Role();
    this.permissionList = this.permissions.map(
      permission => ({
        id:permission.id,
        name:permission.display_name,
        checked: false
      })
    );

    super.openCreate();
  }

  openUpdate(role:Role){
    this.roleService.get(role.id).subscribe(
      role => {
        this.role = role;
        this.permissionList = this.permissions.map(
          permission => ({
            id:permission.id,
            name:permission.display_name,
            checked: !!role.permissions.find(
              rolePermission => permission.id == rolePermission.id
            )
          })
        );
      },
      error => this.notify.serviceError(error)
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
        if(item.checked){
          this.role.permissions.push(item.id);
        }
      }
    );
  }

  closed(){
    this.role = null;
    this.permissionList = null;
  }

}
