import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import {ModalComponent, MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {Client} from "../shared/client";
import {ClientService} from "../shared/client.service";
import { NotificationsService } from 'angular2-notifications/components';
import {FloatingLabelComponent} from "../../../components/floating-label";

@Component({
  moduleId: module.id,
  selector: 'create-client-modal',
  templateUrl: 'create-client-modal.component.html',
  styleUrls: ['create-client-modal.component.css'],
  directives: [MODAL_DIRECTIVES, FloatingLabelComponent]
})
export class CreateClientModalComponent implements OnInit {
  @ViewChild(ModalComponent) private modal:ModalComponent;
  @Output() createdClient = new EventEmitter();
  client:Client;

  constructor(private clientService:ClientService,
              private notification:NotificationsService) {}

  ngOnInit() {
  }

  open(){
    this.client = new Client();
    this.modal.open();
  }

  close(){
    this.modal.close();
    this.client = null;
  }

  create(){
      this.clientService.post(this.client).subscribe(client => {
        this.close();
        this.notification.success('Éxito', 'Cliente creado');
        this.createdClient.emit(client);
      });
  }

}
