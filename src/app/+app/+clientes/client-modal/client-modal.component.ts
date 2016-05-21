import { Component, OnInit, ViewChild, Output,EventEmitter } from '@angular/core';
import {Client} from "../shared/client";
import {ModalComponent, MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {ClientService} from "../shared/client.service";
import {NotificationsService} from "angular2-notifications/lib/notifications.service";
import {FloatingLabelComponent} from "../../../components/floating-label/floating-label.component";

@Component({
  moduleId: module.id,
  selector: 'client-modal',
  templateUrl: 'client-modal.component.html',
  styleUrls: ['client-modal.component.css'],
  directives: [MODAL_DIRECTIVES, FloatingLabelComponent]

})
export class ClientModalComponent implements OnInit {
  @ViewChild(ModalComponent) private modal:ModalComponent;

  @Output() created = new EventEmitter();
  @Output() updated = new EventEmitter();
  @Output() deleted = new EventEmitter();


  updateMode:boolean = false;
  createMode:boolean = false;
  deleteMode:boolean = false;
  locked: boolean = false;
  client: Client;

  constructor(private clientService:ClientService,
              private notification:NotificationsService) {}

  ngOnInit() {
  }

  openCreate(){
    this.client = new Client();
    this.createMode = true;
    this.updateMode = false;
    this.deleteMode = false;
    this.unlock();
    this.modal.open();
  }

  openUpdate(client:Client){
    this.client = client;
    this.createMode = false;
    this.updateMode = true;
    this.deleteMode = false;
    this.lock();
    this.modal.open();
  }
  
  openDelete(client:Client){
    this.client = client;
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

  create(){
    this.clientService.post(this.client).subscribe(client => {
      this.created.emit(client);
      this.close();
      this.notification.success('Éxito', 'Cliente creado');
    });
  }

  update(){
    this.clientService.put(this.client).subscribe(user=> {
      this.updated.emit(user);
      this.close();
      this.notification.success('Éxito', 'Cliente modificado');
    });
  }

  delete(){
    this.clientService.delete(this.client.id).subscribe( response => {
        if(response.success){
          this.deleted.emit(this.client);
          this.close();
          this.notification.success('Éxito', 'Cliente eliminado');
        }
      });
  }

  close(){
    this.modal.close();
  }

}
