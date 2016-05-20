import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { NotificationsService } from 'angular2-notifications/components';
import {UserService} from "../../../user/user.service";
import {User} from "../../../user/user";
import {FloatingLabelComponent} from "../../../components/floating-label/floating-label.component";

@Component({
  moduleId: module.id,
  selector: 'update-user-modal',
  templateUrl: 'update-user-modal.component.html',
  styleUrls: ['update-user-modal.component.css'],
  directives: [MODAL_DIRECTIVES, FloatingLabelComponent]
})
export class UpdateUserModalComponent implements OnInit {
  @ViewChild(ModalComponent) private modal:ModalComponent;
  @Output() modifiedUser = new EventEmitter();
  @Input() user:User;
  locked:boolean = true;
  constructor(private userService:UserService,
              private notification:NotificationsService) {}

  ngOnInit() {
  }

  open(){
    this.modal.open();
  }

  close(){
    this.modal.close();
  }

  update(){
    this.userService.put(this.user).subscribe(user=> {
      this.close();
      this.notification.success('Éxito', 'Usuario modificado');
      this.modifiedUser.emit(user);
    });
  }
  
  lock(){
    this.locked = true;
  }

  unlock(){
    this.locked = false;
  }

}
