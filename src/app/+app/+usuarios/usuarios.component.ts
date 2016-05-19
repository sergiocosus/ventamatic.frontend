import { Component, OnInit } from '@angular/core';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { NotificationsService } from 'angular2-notifications/components';

import {User} from "../../user/user";
import {UserService} from "../../user/user.service";
import {UserItemComponent} from "./user-item/user-item.component";
import {SearchBarComponent} from "../shared/search-bar/search-bar.component";
import {CreateUserModalComponent} from "./create-user-modal/create-user-modal.component";
import {UpdateUserModalComponent} from "./update-user-modal/update-user-modal.component";
import {MainContentComponent} from "../../shared/main-content/main-content.component";


@Component({
  moduleId: module.id,
  selector: 'app-usuarios',
  templateUrl: 'usuarios.component.html',
  styleUrls: ['usuarios.component.css'],
  directives: [
    MODAL_DIRECTIVES,
    MainContentComponent,
    UserItemComponent,
    SearchBarComponent,
    CreateUserModalComponent,
    UpdateUserModalComponent
  ]
})
export class UsuariosComponent implements OnInit {

  users:User[];

  selectedUser: User;
  constructor(private userService:UserService,
              private notification:NotificationsService) {}

  ngOnInit() {
    this.userService.getAll()
      .subscribe(
        users => {this.users = users}
      );
  }

  update(user:User, modal:UpdateUserModalComponent){
    this.selectedUser = user;
    modal.open();
  }

  delete(user:User, modal:ModalComponent){
    this.selectedUser = user;
    modal.open();
  }

  createdUser(user){
    this.users.push(user)
  }

  deleteUser(modal){
    this.userService.delete(this.selectedUser.id)
      .subscribe( response => {
        if(response.success){
          var index = this.users.indexOf(this.selectedUser);
          if (index > -1) {
            this.users.splice(index, 1);
            this.selectedUser = null;
            modal.close();
            this.notification.success('Éxito', 'Usuario eliminado');
          }
        }
      });
  }
}
