import { Component } from '@angular/core';
import {UserService} from "../../../user/user.service";
import {User} from "../../../user/user";
import {CrudModalComponent} from "../../../components/crud-modal";
import {NotifyService} from "../../../services/notify.service";

@Component({
  selector: 'user-modal',
  templateUrl: 'user-modal.component.html',
  styleUrls: ['user-modal.component.scss'],
})
export class UserModalComponent extends CrudModalComponent {
  name = 'Usuario';
  user: User;
  password_confirm:string;

  constructor(protected userService:UserService,
              protected notify:NotifyService) {
    super(notify);
  }

  ngOnInit() {

  }

  openCreate(){
    this.user = new User();
    super.openCreate();
  }

  openUpdate(user:User){
    this.userService.get(user.id).subscribe(
      user => this.user = user,
      error => {
        this.notify.serviceError(error);
        this.delayClose();
      }
    );
    super.openUpdate();
  }

  openDelete(user:User){
    this.user = user;
    super.openDelete(user)
  }


  create(){
    if(this.user.password == this.password_confirm){
      this.userService.post(this.user).subscribe(
        user => this.createdSuccess(user),
        error => this.notify.serviceError(error)
      );
    } else{
      this.notify.error('Las contraseñas no coinciden');
    }
  }

  update(){
    this.userService.put(this.user).subscribe(
      user => this.updatedSuccess(user),
      error => this.notify.serviceError(error)
    );
  }

  delete(){
    this.userService.delete(this.user.id).subscribe(
      response => {
        this.deletedSuccess(this.user);
      },
      error => this.notify.serviceError(error)
    );
  }

  clear(){
    this.user = null;
  }
}
