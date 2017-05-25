import { Component } from '@angular/core';
import {Client} from "../shared/client";
import {ClientService} from "../shared/client.service";
import {CrudModalComponent} from "../../../components/crud-modal";
import {NotifyService} from "../../../services/notify.service";

@Component({
  selector: 'client-modal',
  templateUrl: 'client-modal.component.html',
  styleUrls: ['client-modal.component.scss'],
})
export class ClientModalComponent extends CrudModalComponent{
  client: Client;

  name = 'Cliente';

  constructor(protected clientService:ClientService,
              protected notify:NotifyService) {
    super(notify);
  }

  openCreate(){
    this.client = new Client();
    super.openCreate();
  }

  openUpdate(client:Client){
    this.clientService.get(client.id).subscribe(
      client => this.client = client,
      error => {
        this.notify.serviceError(error)
        this.delayClose();
      }
    );

    super.openUpdate(client);
  }

  openDelete(client:Client){
    this.client = client;
    super.openDelete(client);
  }

  create(){
    this.clientService.post(this.client).subscribe(
      client => this.createdSuccess(client),
      error => this.notify.serviceError(error)
    );
  }

  update(){
    this.clientService.put(this.client).subscribe(
      user => this.updatedSuccess(user),
      error => this.notify.serviceError(error)
    );
  }

  delete(){
    this.clientService.delete(this.client.id).subscribe(
      response => this.deletedSuccess(this.client),
      error => this.notify.serviceError(error)
    );
  }

}
