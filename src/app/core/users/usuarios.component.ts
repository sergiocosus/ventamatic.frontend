import { Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserService} from '../../user/services/user.service';
import {NotifyService} from '../../shared/services/notify.service';
import {User} from '../../user/classes/user';
import {UserDialogComponent} from '../../user/componets/user-dialog/user-dialog.component';
import {MdDialog} from '@angular/material';
import {UserRoleDialogComponent} from '../../user/componets/user-role-dialog/user-role-modal.component';


@Component({
  selector: 'app-usuarios',
  templateUrl: 'usuarios.component.html',
  styleUrls: ['usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  users: User[];
  public deletedControl = new FormControl();

  constructor(private userService: UserService,
              private notify: NotifyService,
              private dialog: MdDialog) {
    this.deletedControl.valueChanges.subscribe(
      showDeleted => this.loadUsers()
    );
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    const params = {
      deleted: this.deletedControl.value
    };

    this.userService.getAll(params).subscribe(
      users => this.users = users,
      error => this.notify.serviceError(error)
    );
  }
  create() {
    const dialog = this.dialog.open(UserDialogComponent);
    dialog.componentInstance.initCreate();
    dialog.componentInstance.created.subscribe(createdUser => {
      this.users.unshift(createdUser);
    });
  }

  update(user: User) {
    const dialog = this.dialog.open(UserDialogComponent);
    dialog.componentInstance.initUpdate(user);
    dialog.componentInstance.updated.subscribe(clientUpdated => {
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
      },
      error => this.notify.serviceError(error)
    );
  }

  openRolesDialog(user_id: number) {
    const dialog = this.dialog.open(UserRoleDialogComponent);
    dialog.componentInstance.init(user_id);
  }
}
