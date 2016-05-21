import { Component, OnInit, ViewChild } from '@angular/core';
import {SearchBarComponent} from "../shared/search-bar/search-bar.component";
import {MainContentComponent} from "../../shared/main-content/main-content.component";
import {ClientItemComponent} from "./client-item/client-item.component";
import {ClientService} from "./shared/client.service";
import {Client} from "./shared/client";
import {NotificationsService} from "angular2-notifications/lib/notifications.service";
import {ClientModalComponent} from "./client-modal/client-modal.component";

@Component({
  moduleId: module.id,
  selector: 'app-clientes',
  templateUrl: 'clientes.component.html',
  styleUrls: ['clientes.component.css'],
  directives: [SearchBarComponent,
    MainContentComponent,
    ClientItemComponent,
    ClientModalComponent
  ],
  providers: [ClientService]
})
export class ClientesComponent implements OnInit {
  @ViewChild(ClientModalComponent) private clientModal:ClientModalComponent;

  clients:Client[];

  constructor(private clientService:ClientService,
              private notification:NotificationsService) {}

  ngOnInit() {
    this.clientService.getAll().subscribe(
      clients => this.clients = clients
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

  deleted(client){
      var index = this.clients.indexOf(client);
      if (index > -1) {
        this.clients.splice(index, 1);
      }
  }

}
