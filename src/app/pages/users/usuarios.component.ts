import { filter, map, mergeMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '@app/api/services/user.service';
import { NotifyService } from '@app/shared/services/notify.service';
import { User } from '@app/api/models/user';
import { UserDialogComponent } from '@app/user/components/user-dialog/user-dialog.component';
import { MatDialog } from '@angular/material';
import { UserRoleDialogComponent } from '@app/user/components/user-role-dialog/user-role-dialog.component';
import { ReportDataSource } from '@app/report/classes/report-data-source';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent, ConfirmDialogData } from '@app/shared/components/confirm-dialog/confirm-dialog.component';
import { extract } from '@app/shared/services/i18n.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-usuarios',
  templateUrl: 'usuarios.component.html',
  styleUrls: ['usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  users: User[];
  public deletedControl = new FormControl();

  form: FormGroup;
  dataSource: ReportDataSource | null;
  dataSourceObservable: Observable<any[]>;

  constructor(private userService: UserService,
              private notify: NotifyService,
              private dialog: MatDialog,
              private fb: FormBuilder) {
    this.deletedControl.valueChanges.subscribe(
      showDeleted => this.loadUsers()
    );
    this.initForm();
  }

  ngOnInit() {
    this.initDataSource();
    this.loadUsers();
  }

  loadUsers() {
    const params = {
      deleted: this.deletedControl.value
    };

    this.userService.getAll(params).subscribe(
      users => {
        this.users = users;
        this.updateDataSource();
      },
      error => this.notify.serviceError(error)
    );
  }

  create() {
    this.dialog.open<UserDialogComponent, null, User>(UserDialogComponent).afterClosed()
      .pipe(filter(Boolean)).subscribe(user => {
      this.users.unshift(user);
      this.updateDataSource();
    });
  }

  update(user: User) {
    this.dialog.open<UserDialogComponent, User, User>(UserDialogComponent, {data: user})
      .afterClosed().pipe(filter(Boolean)).subscribe(
      userUpdated => {
        user.replaceProperties(userUpdated);
        this.updateDataSource();
      });
  }

  delete(user: User) {
    this.dialog.open<ConfirmDialogComponent, ConfirmDialogData>(ConfirmDialogComponent, {
      data: {
        title: user.name,
        message: extract('common.deleteConfirm'),
      }
    }).afterClosed().pipe(
      filter(Boolean),
      mergeMap(() => this.userService.delete(user.id))
    ).subscribe(() => {
        if (this.deletedControl.value) {
          user.deleted_at = ' ';
        } else {
          _.remove(this.users, user);
          this.dataSource.setData(this.users);
        }
      },
      error => this.notify.serviceError(error)
    );
  }

  restore(user: User) {
    this.userService.restore(user.id).subscribe(
      clientRestored => {
        const index = this.users.indexOf(user);
        if (index > -1) {
          this.users[index] = clientRestored;
        }

        this.notify.success('Usuario restaurado');
        this.updateDataSource();
      },
      error => this.notify.serviceError(error)
    );
  }

  openRolesDialog(user: User) {
    this.dialog.open<UserRoleDialogComponent, User>(UserRoleDialogComponent, {data: user});
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
      case 'username':
        return object.username == value;
      case 'address':
        return object.address.toLocaleLowerCase().search(value.toLowerCase()) >= 0;
      case 'name':
        return object.name.toLocaleLowerCase().search(value.toLowerCase()) >= 0;
    }
    return true;
  }

  protected initForm() {
    this.form = this.fb.group({
      'username': [''],
      'name': [''],
      'address': [''],
    });
  }

  private updateDataSource() {
    this.dataSource.setData(this.users);
  }
}
