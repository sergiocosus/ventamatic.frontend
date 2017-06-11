import { Component } from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {Client} from '../../classes/client';
import {ClientService} from '../../services/client.service';
import {CrudModalComponent} from '../../../shared/components/crud-modal/crud-modal.component';
import {NotifyService} from '../../../shared/services/notify.service';

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.scss'],
})
export class ClientDialogComponent extends CrudModalComponent {
  client: Client;
  name = 'Cliente';

  constructor(protected clientService: ClientService,
              protected notify: NotifyService,
              protected dialogRef: MdDialogRef<ClientDialogComponent>) {
    super(notify, dialogRef);
  }

  initCreate() {
    this.client = new Client();
    super.initCreate();
  }

  initUpdate(client: Client) {
    this.clientService.get(client.id).subscribe(
      loadedClient => this.client = loadedClient,
      error => {
        this.notify.serviceError(error);
        this.delayClose();
      }
    );

    super.initUpdate(client);
  }

  initDelete(client: Client) {
    this.client = client;
    super.initDelete(client);
  }

  create() {
    this.clientService.post(this.client).subscribe(
      client => this.createdSuccess(client),
      error => this.notify.serviceError(error)
    );
  }

  update() {
    this.clientService.put(this.client).subscribe(
      user => this.updatedSuccess(user),
      error => this.notify.serviceError(error)
    );
  }

  delete() {
    this.clientService.delete(this.client.id).subscribe(
      response => this.deletedSuccess(this.client),
      error => this.notify.serviceError(error)
    );
  }

}
