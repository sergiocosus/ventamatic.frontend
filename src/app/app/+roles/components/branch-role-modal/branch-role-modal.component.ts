import {Component} from '@angular/core';
import {CrudModalComponent} from "../../../../components/crud-modal/crud-modal.component";
import {BranchRole} from "../../classes/branch-role";
import {BranchPermission} from "../../../../shared/security/branch-permission";
import {NotifyService} from "../../../../services/notify.service";
import {BranchPermissionService} from "../../../../shared/security/branch-permission.service";
import {BranchRoleService} from "../../services/branch-role.service";

@Component({
  selector: 'app-branch-role-modal',
  templateUrl: './branch-role-modal.component.html',
  styleUrls: ['./branch-role-modal.component.scss']
})
export class BranchRoleModalComponent extends CrudModalComponent {
  name = 'Rol de sucursal';

  branchRole: BranchRole;

  branchPermissions:BranchPermission[] = [];
  branchPermissionList:{id:number; name:string, checked:boolean}[] = [];

  constructor(protected notify:NotifyService,
              private branchRoleService:BranchRoleService,
              private branchPermissionService:BranchPermissionService) {
    super(notify);
  }

  ngOnInit() {
    this.branchPermissionService.getAll().subscribe(
      permissions =>  this.branchPermissions = permissions
    )
  }

  openCreate(){
    this.branchRole = new BranchRole();
    this.branchPermissionList = this.branchPermissions.map(
      permission => ({
        id:permission.id,
        name:permission.display_name,
        checked: false
      })
    );

    super.openCreate();
  }

  openUpdate(branchRole:BranchRole){
    this.branchRoleService.get(branchRole.id).subscribe(
      branchRole => {
        this.branchRole = branchRole;
        this.branchPermissionList = this.branchPermissions.map(
          permission => {
            return {
              id:permission.id,
              name:permission.display_name,
              checked: branchRole.branch_permissions.find(
                rolePermission => permission.id == rolePermission.id
              ) ? true : false
            };

          }
        );
        console.log(this.branchPermissionList);
      }
    );

    super.openUpdate();
  }

  openDelete(branchRole:BranchRole){
    this.branchRole = branchRole;
    super.openDelete(branchRole)
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
        if(item.checked){
          this.branchRole.branch_permissions.push(item.id);
        }
      }
    );
  }

  closed(){
    this.branchRole = null;
    this.branchPermissionList = null;
  }
}
