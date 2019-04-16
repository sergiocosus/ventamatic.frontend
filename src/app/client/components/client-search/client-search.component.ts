
import {distinctUntilChanged, debounceTime} from 'rxjs/operators';
import {Component, OnInit, Output, EventEmitter, HostListener, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Client} from '../../classes/client';
import {ClientService} from '../../services/client.service';
import {SelectableComponent} from '../../../shared/components/selectable/selectable.component';
import {PopoverComponent} from '../../../shared/components/popover/popover.component';
import {NotifyService} from '../../../shared/services/notify.service';

@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.scss']
})
export class ClientSearchComponent implements OnInit {
  @ViewChild(SelectableComponent) selectable: SelectableComponent;
  @ViewChild(PopoverComponent) popover: PopoverComponent;
  @Output() selected = new EventEmitter();

  loading = false;
  id: number;
  name: string;
  idControl = new FormControl();
  nameControl = new FormControl();
  clients: Client[] = null;

  @HostListener('keydown', ['$event']) onKeyDown($event) {
    return this.selectable.keydown($event);
  }

  constructor(private clientService: ClientService,
              private notify: NotifyService) {
    this.idControl.valueChanges.pipe(debounceTime(250),distinctUntilChanged(),)
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

    this.nameControl.valueChanges.pipe(debounceTime(250),distinctUntilChanged(),)
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
