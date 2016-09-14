import { Component, OnInit, ViewChild } from '@angular/core';
import {SearchBarComponent} from "../shared/search-bar";
import {MainContentComponent} from "../../shared/main-content";
import {ClientItemComponent} from "./client-item";
import {ClientService} from "./shared/client.service";
import {Client} from "./shared/client";
import {NotificationsService} from "angular2-notifications/lib/notifications.service";
import {ClientModalComponent} from "./client-modal";
import {NotifyService} from "../../services/notify.service";

@Component({
  selector: 'app-clientes',
  templateUrl: 'clientes.component.html',
  styleUrls: ['clientes.component.scss'],
  providers: [ClientService]
})
export class ClientesComponent implements OnInit {
  @ViewChild(ClientModalComponent) private clientModal:ClientModalComponent;

  clients:Client[];

  constructor(private clientService:ClientService,
              private notify:NotifyService) {}

  ngOnInit() {
    this.clientService.getAll().subscribe(
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

  created(client:Client){
    this.clients.unshift(client);
  }

  updated(client:Client){

  }

  deleted(client:Client){
      var index = this.clients.indexOf(client);
      if (index > -1) {
        this.clients.splice(index, 1);
      }
  }

}
