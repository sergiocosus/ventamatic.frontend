import { Component, OnInit, ViewChild } from '@angular/core';

import {ClientService} from "./shared/client.service";
import {Client} from "./shared/client";
import {NotificationsService} from "angular2-notifications";
import {ClientModalComponent} from "./client-modal";
import {NotifyService} from "../../services/notify.service";
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: 'clientes.component.html',
  styleUrls: ['clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  @ViewChild(ClientModalComponent) private clientModal:ClientModalComponent;

  clients:Client[];
  public deletedControl = new FormControl();

  constructor(private clientService:ClientService,
              private notify:NotifyService) {
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

  create(){
    this.clientModal.openCreate();
  }

  update(client:Client){
    this.clientModal.openUpdate(client);
  }

  delete(client:Client){
    this.clientModal.openDelete(client);
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

  created(client:Client){
    this.clients.unshift(client);
  }

  updated(client:Client){

  }

  deleted(client: Client){
    const index = this.clients.indexOf(client);
    if (index > -1) {
      if (this.deletedControl.value) {
        this.clients[index].deleted_at = ' ';
      } else {
        this.clients.splice(index, 1);
      }
    }
  }
}
