import { Component, OnInit, ViewChild, Output,EventEmitter } from '@angular/core';
import {ModalComponent, MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {NotificationsService} from "angular2-notifications/lib/notifications.service";
import {FloatingLabelComponent} from "../../../components/floating-label";
import {UserService} from "../../../user/user.service";
import {User} from "../../../user/user";


@Component({
  moduleId: module.id,
  selector: 'user-modal',
  templateUrl: 'user-modal.component.html',
  styleUrls: ['user-modal.component.css'],
  directives: [MODAL_DIRECTIVES, FloatingLabelComponent]
})
export class UserModalComponent implements OnInit {
  @ViewChild(ModalComponent) private modal:ModalComponent;

  @Output() created = new EventEmitter();
  @Output() updated = new EventEmitter();
  @Output() deleted = new EventEmitter();

  updateMode:boolean = false;
  createMode:boolean = false;
  deleteMode:boolean = false;
  locked: boolean = false;
  user: User;

  
  password_confirm:string;

  constructor(private userService:UserService,
              private notification:NotificationsService) {}

  ngOnInit() {
  }

  openCreate(){
    this.user = new User();
    this.createMode = true;
    this.updateMode = false;
    this.deleteMode = false;
    this.unlock();
    this.modal.open();
  }

  openUpdate(user:User){
    this.user = user;
    this.createMode = false;
    this.updateMode = true;
    this.deleteMode = false;
    this.lock();
    this.modal.open();
  }

  openDelete(user:User){
    this.user = user;
    this.createMode = false;
    this.updateMode = false;
    this.deleteMode = true;
    this.unlock();
    this.modal.open();
  }

  lock(){
    this.locked = true;
  }

  unlock(){
    this.locked = false;
  }
  
  submit(){
    if(this.createMode) this.create();
    if(this.updateMode) this.update();
    if(this.deleteMode) this.delete();
  }

  create(){
    if(this.user.password ==this.password_confirm){
      this.userService.post(this.user).subscribe(user => {
        this.created.emit(user);
        this.close();
        this.notification.success('Éxito', 'Usuario creado');
      });
    } else{
      this.notification.error('Error','Las contraseñas no coinciden');
    }
  }

  update(){
    this.userService.put(this.user).subscribe(user=> {
      this.updated.emit(user);
      this.close();
      this.notification.success('Éxito', 'Usuario modificado');
    });
  }

  delete(){
    this.userService.delete(this.user.id).subscribe( response => {
      if(response.success){
        this.deleted.emit(this.user);
        this.close();
        this.notification.success('Éxito', 'Usuario eliminado');
      }
    });
  }

  close(){
    this.modal.close();
  }


}
