import { Component, OnInit, ViewChild, Output,EventEmitter } from '@angular/core';
import {ModalComponent, MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {NotificationsService} from "angular2-notifications/lib/notifications.service";
import {FloatingLabelComponent} from "../../../components/floating-label";
import {UserService} from "../../../user/user.service";
import {User} from "../../../user/user";
import {CrudModalComponent} from "../../../components/crud-modal";
import {InputLabelComponent} from "../../../components/input-label/input-label.component";


@Component({
  moduleId: module.id,
  selector: 'user-modal',
  templateUrl: 'user-modal.component.html',
  styleUrls: ['user-modal.component.css'],
  directives: [
    MODAL_DIRECTIVES,
    InputLabelComponent
  ]
})
export class UserModalComponent extends CrudModalComponent {
  @ViewChild(ModalComponent) protected modal:ModalComponent;

  @Output() created;
  @Output() updated;
  @Output() deleted;

  name = 'Usuario';

  user: User;

  password_confirm:string;

  constructor(protected userService:UserService,
              protected notification:NotificationsService) {
    super(notification);
  }

  ngOnInit() {
  }

  openCreate(){
    this.user = new User();
    super.openCreate();
  }

  openUpdate(user:User){
    this.user = user;
    super.openUpdate(user);
  }

  openDelete(user:User){
    this.user = user;
    super.openDelete(user)
  }


  create(){
    if(this.user.password ==this.password_confirm){
      this.userService.post(this.user).subscribe(
        user => this.createdSuccess(user)
      );
    } else{
      this.notification.error('Error','Las contraseñas no coinciden');
    }
  }

  update(){
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

}
