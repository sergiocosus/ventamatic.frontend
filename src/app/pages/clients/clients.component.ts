import { filter, map, mergeMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Client } from '@app/api/models/client';
import { ClientService } from '@app/api/services/client.service';
import { NotifyService } from '@app/shared/services/notify.service';
import { ClientDialogComponent } from '@app/client/components/client-dialog';
import { Observable } from 'rxjs';
import { ReportDataSource } from '@app/report/classes/report-data-source';
import { ConfirmDialogComponent, ConfirmDialogData } from '@app/shared/components/confirm-dialog/confirm-dialog.component';
import * as _ from 'lodash';
import { extract } from '@app/shared/services/i18n.service';

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
              private dialog: MatDialog,
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
    this.dialog.open<ClientDialogComponent, null, Client>(ClientDialogComponent)
      .afterClosed().pipe(filter(a => !!a)).subscribe(client => {
      this.clients.unshift(client);
      this.dataSource.setData(this.clients);
    });
  }

  update(client: Client) {
    this.dialog.open<ClientDialogComponent, Client, Client>(ClientDialogComponent, {data: client})
      .afterClosed().pipe(filter(a => !!a))
      .subscribe(updatedClient => {
        client.replaceProperties(updatedClient);
        this.dataSource.setData(this.clients);
      });
  }

  delete(client: Client) {
    this.dialog.open<ConfirmDialogComponent, ConfirmDialogData>(ConfirmDialogComponent, {
      data: {
        title: client.name,
        message: extract('common.deleteConfirm'),
      }
    }).afterClosed().pipe(
      filter(Boolean),
      mergeMap(() => this.clientService.delete(client.id))
    ).subscribe(() => {
        if (this.deletedControl.value) {
          client.deleted_at = ' ';
        } else {
          _.remove(this.clients, client);
          this.dataSource.setData(this.clients);
        }
      },
      error => this.notify.serviceError(error)
    );
  }

  restore(client: Client) {
    this.clientService.restore(client.id).subscribe(
      clientRestored => {
        client.replaceProperties(clientRestored);
        this.notify.success(extract('common.restoredSuccess'));
      },
      error => this.notify.serviceError(error)
    );
  }

  protected initDataSource() {
    this.dataSource = new ReportDataSource(
      undefined,
      undefined, undefined,
      this.form.valueChanges.pipe(map(formData => {
          return {
            formData: formData,
            filter: this.fieldIsOk.bind(this)
          };
        }
      ))
    );

    this.dataSourceObservable = this.dataSource.connect();
  }

  protected fieldIsOk(object, key, value) {
    switch (key) {
      case 'id':
        return object.id == value;
      case 'address':
        return object.address.toLocaleLowerCase().search(value.toLowerCase()) >= 0;
      case 'name':
        return object.name.toLocaleLowerCase().search(value.toLowerCase()) >= 0;
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
