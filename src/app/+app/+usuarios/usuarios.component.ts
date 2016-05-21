import { Component, OnInit, ViewChild} from '@angular/core';
import { NotificationsService } from 'angular2-notifications/components';

import {User} from "../../user/user";
import {UserService} from "../../user/user.service";
import {UserItemComponent} from "./user-item";
import {SearchBarComponent} from "../shared/search-bar";
import {MainContentComponent} from "../../shared/main-content";
import {UserModalComponent} from "./user-modal";


@Component({
  moduleId: module.id,
  selector: 'app-usuarios',
  templateUrl: 'usuarios.component.html',
  styleUrls: ['usuarios.component.css'],
  directives: [
    MainContentComponent,
    UserItemComponent,
    SearchBarComponent,
    UserModalComponent
  ]
})
export class UsuariosComponent implements OnInit {
  @ViewChild(UserModalComponent) private userModal:UserModalComponent;

  users:User[];

  constructor(private userService:UserService,
              private notification:NotificationsService) {}

  ngOnInit() {
    this.userService.getAll().subscribe(
        users => this.users = users
      );
  }

  create(){
    this.userModal.openCreate();
  }

  update(user:User){
    this.userModal.openUpdate(user);
  }

  delete(user:User){
    this.userModal.openDelete(user);
  }

  created(user:User){
    this.users.unshift(user);
  }

  updated(user:User){

  }

  deleted(user:User){
    var index = this.users.indexOf(user);
    if (index > -1) {
      this.users.splice(index, 1);
    }
  }
}
