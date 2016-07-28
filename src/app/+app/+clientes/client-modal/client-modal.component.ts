import { Component, ViewChild, Output } from '@angular/core';
import {Client} from "../shared/client";
import {ModalComponent, MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {ClientService} from "../shared/client.service";
import {NotificationsService} from "angular2-notifications/lib/notifications.service";
import {FloatingLabelComponent} from "../../../components/floating-label";
import {CrudModalComponent} from "../../../components/crud-modal";
import {InputLabelComponent} from "../../../components/input-label/input-label.component";

@Component({
  moduleId: module.id,
  selector: 'client-modal',
  templateUrl: 'client-modal.component.html',
  styleUrls: ['client-modal.component.css'],
  directives: [
    MODAL_DIRECTIVES,
    InputLabelComponent
  ]

})
export class ClientModalComponent extends CrudModalComponent{
  @ViewChild(ModalComponent) protected modal:ModalComponent;

  @Output() created;
  @Output() updated;
  @Output() deleted;

  client: Client;

  name = 'Cliente';

  constructor(protected clientService:ClientService,
              protected notification:NotificationsService) {
    super(notification);
  }

  openCreate(){
    this.client = new Client();
    super.openCreate();
  }

  openUpdate(client:Client){
    this.client = client;
    super.openUpdate(client);
  }

  openDelete(client:Client){
    this.client = client;
    super.openDelete(client);
  }

  create(){
    this.clientService.post(this.client).subscribe(client => {
      this.createdSuccess(client);
    });
  }

  update(){
    this.clientService.put(this.client).subscribe( user=> {
      this.updatedSuccess(user);
    });
  }

  delete(){
    this.clientService.delete(this.client.id).subscribe( response => {
        this.deletedSuccess(this.client);
      });
  }

}
