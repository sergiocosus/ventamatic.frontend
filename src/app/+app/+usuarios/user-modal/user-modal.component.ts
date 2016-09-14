import { Component, ViewChild, Output } from '@angular/core';
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import {UserService} from "../../../user/user.service";
import {User} from "../../../user/user";
import {CrudModalComponent} from "../../../components/crud-modal";
import {NotifyService} from "../../../services/notify.service";
import {RoleService} from "../../+roles/services/role.service";
import {Role} from "../../+roles/classes/role";


@Component({
  selector: 'user-modal',
  templateUrl: 'user-modal.component.html',
  styleUrls: ['user-modal.component.scss'],
})
export class UserModalComponent extends CrudModalComponent {
  @ViewChild(ModalComponent) protected modal:ModalComponent;

  @Output() created;
  @Output() updated;
  @Output() deleted;

  name = 'Usuario';

  user: User;

  password_confirm:string;

  roles:Role[] = [];
  roleItems:any[] = [];
  selectedRoleItems:any[] = [];


  constructor(protected userService:UserService,
              protected notify:NotifyService,
              protected roleService:RoleService) {
    super(notify);
  }

  ngOnInit() {
    this.roleService.getAll().subscribe(
        roles => {
          this.roles = roles;
          this.roleItems = this.roles.map(
            (role:Role) => ({text:role.display_name, id:role.id})
          )
        }
    )
  }

  openCreate(){
    this.user = new User();
    super.openCreate();
  }

  openUpdate(user:User){
    this.userService.get(user.id).subscribe(
      user => {
        this.user = user;

        this.selectedRoleItems = user.roles.map(
          (role:Role) => ({text:role.display_name, id:role.id})
        );
      }
    );
    super.openUpdate();
  }

  openDelete(user:User){
    this.user = user;
    super.openDelete(user)
  }


  create(){
    this.appendData();
    if(this.user.password ==this.password_confirm){
      this.userService.post(this.user).subscribe(
        user => this.createdSuccess(user)
      );
    } else{
      this.notify.error('Las contraseñas no coinciden');
    }
  }

  update(){
    this.appendData();
    this.userService.put(this.user).subscribe(user=> {
      this.updatedSuccess(user);
    });
  }

  delete(){
    this.userService.delete(this.user.id).subscribe( response => {
      if(response.success){
        this.deletedSuccess(this.user);
      }
    });
  }

  appendData() {
    this.user.roles = this.selectedRoleItems.map(
      item => item.id
    );
  }

  closed(){
    this.user = null;
    this.selectedRoleItems = [];
  }


}
