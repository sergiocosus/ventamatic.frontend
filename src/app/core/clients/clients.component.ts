import { Component, OnInit, ViewChild } from '@angular/core';

import {FormControl} from '@angular/forms';
import {MdDialog} from '@angular/material';
import {Client} from '../../client/classes/client';
import {ClientService} from '../../client/services/client.service';
import {NotifyService} from '../../shared/services/notify.service';
import {ClientDialogComponent} from '../../client/components/client-dialog/client-dialog.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  public deletedControl = new FormControl();

  constructor(private clientService: ClientService,
              private notify: NotifyService,
              private dialog: MdDialog) {
    this.deletedControl.valueChanges.subscribe(
      showDeleted => this.loadClients()
    );
  }

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    const params = {
      deleted: this.deletedControl.value
    };

    this.clientService.getAll(params).subscribe(
      clients => this.clients = clients,
      error => this.notify.serviceError(error)
    );
  }

  create() {
    const dialog = this.dialog.open(ClientDialogComponent);
    dialog.componentInstance.initCreate();
    dialog.componentInstance.created.subscribe(createdClient => {
      this.clients.unshift(createdClient);
    });
  }

  update(client: Client) {
    const dialog = this.dialog.open(ClientDialogComponent);
    dialog.componentInstance.initUpdate(client);
    dialog.componentInstance.updated.subscribe(clientUpdated => {
    });
  }

  delete(client: Client) {
    const dialog = this.dialog.open(ClientDialogComponent);
    dialog.componentInstance.initDelete(client);
    dialog.componentInstance.deleted.subscribe(clientDeleted => {
      const index = this.clients.indexOf(clientDeleted);
      if (index > -1) {
        if (this.deletedControl.value) {
          this.clients[index].deleted_at = ' ';
        } else {
          this.clients.splice(index, 1);
        }
      }
    });
  }

  restore(client: Client) {
    this.clientService.restore(client.id).subscribe(
      clientRestored => {
        const index = this.clients.indexOf(client);
        if (index > -1) {
          this.clients[index] = clientRestored;
        }

        this.notify.success('Cliente restaurado');
      },
      error => this.notify.serviceError(error)
    );
  }
}
