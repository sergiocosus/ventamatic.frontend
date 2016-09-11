import {Component, OnInit, ViewChild} from '@angular/core';
import {RoleService} from "./services/role.service";
import {Role} from "./classes/role";
import {RoleModalComponent} from "./components/role-modal/role-modal.component";

@Component({
  selector: 'app-roles',
  templateUrl: 'roles.component.html',
  styleUrls: ['roles.component.scss']
})
export class RolesComponent implements OnInit {
  @ViewChild(RoleModalComponent) roleModal:RoleModalComponent;

  private roles:Role[];

  constructor(private roleService:RoleService) {}

  ngOnInit() {
    this.roleService.getAll().subscribe(
      roles => {
        this.roles = roles;
      }
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

}
