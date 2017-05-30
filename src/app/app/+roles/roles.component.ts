import {Component, OnInit, ViewChild} from '@angular/core';
import {RoleService} from "./services/role.service";
import {Role} from "./classes/role";
import {RoleModalComponent} from "./components/role-modal/role-modal.component";
import {NotifyService} from "../../services/notify.service";
import {BranchRoleService} from "./services/branch-role.service";
import {BranchRole} from "./classes/branch-role";
import {BranchRoleModalComponent} from "./components/branch-role-modal/branch-role-modal.component";

@Component({
  selector: 'app-roles',
  templateUrl: 'roles.component.html',
  styleUrls: ['roles.component.scss']
})
export class RolesComponent implements OnInit {
  @ViewChild(RoleModalComponent) roleModal:RoleModalComponent;
  @ViewChild(BranchRoleModalComponent) branchRoleModal:BranchRoleModalComponent;

  roles:Role[];
  branchRoles:BranchRole[];

  constructor(private roleService:RoleService,
              private branchRoleService:BranchRoleService,
              private notify:NotifyService) {}

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

  clickUpdate(role:Role){
    this.update(role);
  }

  clickDelete($event, role:Role){
    $event.preventDefault();
    $event.stopPropagation();

    this.delete(role);
  }

  update(role:Role) {
    this.roleModal.openUpdate(role);
  }

  create(){
    this.roleModal.openCreate();
  }

  delete(role:Role){
    this.roleModal.openDelete(role);
  }


  updateBranchPermission(branchRole:BranchRole) {
    this.branchRoleModal.openUpdate(branchRole);
  }

  createBranchPermission(){
    this.branchRoleModal.openCreate();
  }

  deleteBranchPermission(branchRole:BranchRole){
    this.branchRoleModal.openDelete(branchRole);
  }

  created(role:Role){
    this.roles.push(role);
  }

  updated(role:Role){
    for(var i=0; i<this.roles.length; i++) {
      if(role.id == this.roles[i].id) {
        this.roles[i] = role;
      }
    }
  }

  deleted(role:Role){
    var index = this.roles.indexOf(role);
    if (index > -1) {
      this.roles.splice(index, 1);
    }
  }

  createdBranchRole(branchRole:BranchRole){
    this.branchRoles.push(branchRole);
  }

  updatedBranchRole(branchRole:BranchRole){
    for(var i=0; i<this.branchRoles.length; i++) {
      if(branchRole.id == this.branchRoles[i].id) {
        this.branchRoles[i] = branchRole;
      }
    }
  }

  deletedBranchRole(branchRole:BranchRole){
    var index = this.branchRoles.indexOf(branchRole);
    if (index > -1) {
      this.branchRoles.splice(index, 1);
    }
  }

}
