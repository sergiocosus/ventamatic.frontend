
import {map} from 'rxjs/operators';
import { Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../modules/api/services/user.service';
import {NotifyService} from '../../shared/services/notify.service';
import {User} from '../../modules/api/models/user';
import {UserDialogComponent} from '../../modules/user/components/user-dialog/user-dialog.component';
import {MatDialog} from '@angular/material';
import {UserRoleDialogComponent} from '../../modules/user/components/user-role-dialog/user-role-modal.component';
import {ReportDataSource} from '../../modules/report/classes/report-data-source';
import {Observable} from 'rxjs';


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
    const dialog = this.dialog.open(UserDialogComponent);
    dialog.componentInstance.initCreate();
    dialog.componentInstance.created.subscribe(createdUser => {
      this.users.unshift(createdUser);
      this.updateDataSource();
    });
  }

  update(user: User) {
    const dialog = this.dialog.open(UserDialogComponent);
    dialog.componentInstance.initUpdate(user);
    dialog.componentInstance.updated.subscribe(clientUpdated => {
      this.updateDataSource();
    });
  }

  delete(user: User) {
    const dialog = this.dialog.open(UserDialogComponent);
    dialog.componentInstance.initDelete(user);
    dialog.componentInstance.deleted.subscribe(userDeleted => {
      const index = this.users.indexOf(userDeleted);
      if (index > -1) {
        if (this.deletedControl.value) {
          this.users[index].deleted_at = ' ';
        } else {
          this.users.splice(index, 1);
        }
      }
      this.updateDataSource();
    });
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

  openRolesDialog(user_id: number) {
    const dialog = this.dialog.open(UserRoleDialogComponent);
    dialog.componentInstance.init(user_id);
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
      case 'username': return object.username == value;
      case 'address': return object.address.toLocaleLowerCase().search(value.toLowerCase()) >= 0;
      case 'name': return object.name.toLocaleLowerCase().search(value.toLowerCase()) >= 0;
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
