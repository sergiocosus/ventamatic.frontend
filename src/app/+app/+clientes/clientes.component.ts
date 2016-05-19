import { Component, OnInit } from '@angular/core';
import {SearchBarComponent} from "../shared/search-bar/search-bar.component";
import {MainContentComponent} from "../../shared/main-content/main-content.component";
import {ClientItemComponent} from "./client-item/client-item.component";
import {ClientService} from "./shared/client.service";
import {Client} from "./shared/client";
import {Observable} from "rxjs/Observable";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {CreateClientModalComponent} from "./create-client-modal/create-client-modal.component";

@Component({
  moduleId: module.id,
  selector: 'app-clientes',
  templateUrl: 'clientes.component.html',
  styleUrls: ['clientes.component.css'],
  directives: [SearchBarComponent,
    MainContentComponent,
    ClientItemComponent,
    CreateClientModalComponent],
  providers: [ClientService]
})
export class ClientesComponent implements OnInit {
  clients$:Observable<Client[]>;
  selectedClient:Client;
  constructor(private clientService:ClientService) {}

  ngOnInit() {
    this.clients$ = this.clientService.getAll();
  }

 /* update(client:Client, modal:Upd){
    this.selectedUser = user;
    modal.open();
  }*/

  delete(client:Client, modal:ModalComponent){
    this.selectedClient = client;
    modal.open();
  }

  createdUser(user){
    this.clients$ = this.clientService.getAll();
  }

/*  deleteUser(modal){
    this.userService.delete(this.selectedUser.id)
      .subscribe( response => {
        if(response.success){
          var index = this.users.indexOf(this.selectedUser);
          if (index > -1) {
            this.users.splice(index, 1);
            this.selectedUser = null;
            modal.close();
            this.notification.success('Éxito', 'Usuario eliminado');
          }
        }
      });
  }*/

}
