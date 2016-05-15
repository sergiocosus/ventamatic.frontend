import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { NotificationsService } from 'angular2-notifications/components';

import {User} from "../../../user/user";
import {UserService} from "../../../user/user.service";

@Component({
  moduleId: module.id,
  selector: 'create-user-modal',
  templateUrl: 'create-user-modal.component.html',
  styleUrls: ['create-user-modal.component.css'],
  directives: [MODAL_DIRECTIVES]

})
export class CreateUserModalComponent implements OnInit {
  @ViewChild(ModalComponent) private modal:ModalComponent;
  @Output() createdUser = new EventEmitter();
  user:User;

  constructor(private userService:UserService,
              private notification:NotificationsService) {}

  ngOnInit() {
  }

  open(){
    this.user = new User();
    this.modal.open();
  }

  close(){
    this.modal.close();
    this.user = null;
  }

  create(){
    this.userService.post(this.user).subscribe(user=> {
        this.close();
        this.notification.success('Éxito', 'Usuario creado');
        this.createdUser.emit(user);
    });
  }

}
