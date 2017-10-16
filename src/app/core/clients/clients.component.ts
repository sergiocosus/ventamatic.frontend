import { Component, OnInit, ViewChild } from '@angular/core';

import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MdDialog} from '@angular/material';
import {Client} from '../../client/classes/client';
import {ClientService} from '../../client/services/client.service';
import {NotifyService} from '../../shared/services/notify.service';
import {ClientDialogComponent} from '../../client/components/client-dialog/client-dialog.component';
import {Observable} from 'rxjs/Observable';
import {ReportDataSource} from '../../report/classes/report-data-source';

@Component({
  selector: 'app-clientes',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  public deletedControl = new FormControl();

  form: FormGroup;
  dataSource: ReportDataSource | null;
  dataSourceObservable: Observable<any[]>;


  constructor(private clientService: ClientService,
              private notify: NotifyService,
              private dialog: MdDialog,
              private fb: FormBuilder) {
    this.deletedControl.valueChanges.subscribe(
      showDeleted => this.loadClients()
    );

    this.initForm();
  }

  ngOnInit() {
    this.initDataSource();
    this.loadClients();
  }

  loadClients() {
    const params = {
      deleted: this.deletedControl.value
    };

    this.clientService.getAll(params).subscribe(
      clients => {
        this.clients = clients;
        this.dataSource.setData(clients);
      },
      error => this.notify.serviceError(error)
    );
  }

  create() {
    const dialog = this.dialog.open(ClientDialogComponent);
    dialog.componentInstance.initCreate();
    dialog.componentInstance.created.subscribe(createdClient => {
      this.clients.unshift(createdClient);
      this.dataSource.setData(this.clients);
    });
  }

  update(client: Client) {
    const dialog = this.dialog.open(ClientDialogComponent);
    dialog.componentInstance.initUpdate(client);
    dialog.componentInstance.updated.subscribe(clientUpdated => {
      this.dataSource.setData(this.clients);
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
      this.dataSource.setData(this.clients);
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

  protected initDataSource() {
    this.dataSource = new ReportDataSource(
      undefined,
      undefined, undefined,
      this.form.valueChanges.map(formData => {
          return {
            formData: formData,
            filter: this.fieldIsOk.bind(this)
          };
        }
      )
    );

    this.dataSourceObservable = this.dataSource.connect();
  }

  protected fieldIsOk(object, key, value) {
    switch (key) {
      case 'id': return object.id == value;
      case 'address': return object.address.toLocaleLowerCase().search(value.toLowerCase()) >= 0;
      case 'name': return object.name.toLocaleLowerCase().search(value.toLowerCase()) >= 0;
    }
    return true;
  }

  protected initForm() {
    this.form = this.fb.group({
      'id': [''],
      'name': [''],
      'address': [''],
    });
  }
}
