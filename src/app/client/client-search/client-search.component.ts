import {Component, OnInit, Output, EventEmitter, HostListener, ElementRef, ViewChild} from '@angular/core';
import {ClientService} from "../../+app/+clientes/shared/client.service";
import {FormControl} from "@angular/forms";
import {Client} from "../../+app/+clientes/shared/client";
import {NotifyService} from '../../services/notify.service';
import {SelectableComponent} from '../../shared/selectable/selectable.component';
import {PopoverComponent} from '../../shared/popover/popover.component';

@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.scss']
})
export class ClientSearchComponent implements OnInit {
  @ViewChild(SelectableComponent) selectable:SelectableComponent;
  @ViewChild(PopoverComponent) popover:PopoverComponent;
  @Output() selected = new EventEmitter();

  @HostListener('keydown', ['$event']) onKeyDown($event) {
    return this.selectable.keydown($event);
  }

  loading = false;

  id: number;
  name: string;

  idControl = new FormControl();
  nameControl = new FormControl();

  clients: Client[] = null;


  constructor(private clientService: ClientService,
              private notify: NotifyService) {
    this.idControl.valueChanges.debounceTime(250).distinctUntilChanged()
      .subscribe(value => {
        this.startLoading();
        if (!value  || value === '' ) { return; }
        this.clientService.get(value).subscribe(
          client => this.setClients([client]),
          error => {
            this.clients = null;
            this.loading = false;
          }
        );
      });

    this.nameControl.valueChanges.debounceTime(250).distinctUntilChanged()
      .subscribe(value => {
        this.startLoading();
        if (!value  || value === '' ) { return; }
        this.clientService.getSearch(value).subscribe(
          clients => this.setClients(clients),
          error => this.notify.serviceError(error)
        );
      });
  }

  startLoading() {
    this.clients = null;
    this.loading = true;
  }

  setClients(clients: Client[]) {
    this.clients = clients;
    this.loading = false;
  }

  select($event) {
    this.selected.emit($event);
    this.popover.hidden = true;
  }

  ngOnInit() {
  }

}
