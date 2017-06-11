import {Component, OnInit} from '@angular/core';
import {CrudModalComponent} from '../../../shared/components/crud-modal/crud-modal.component';
import {NotifyService} from '../../../shared/services/notify.service';
import {MdDialogRef} from '@angular/material';
import {User} from '../../classes/user';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent extends CrudModalComponent implements OnInit {
  name = 'Usuario';
  user: User;
  password_confirm: string;

  constructor(protected userService: UserService,
              protected notify: NotifyService,
              protected dialogRef: MdDialogRef<UserDialogComponent>) {
    super(notify, dialogRef);
  }

  ngOnInit() {

  }

  initCreate() {
    this.user = new User();
    super.initCreate();
  }

  initUpdate(user: User) {
    this.userService.get(user.id).subscribe(
      gettedUser => this.user = gettedUser,
      error => {
        this.notify.serviceError(error);
        this.delayClose();
      }
    );
    super.initUpdate();
  }

  initDelete(user: User) {
    this.user = user;
    super.initDelete(user);
  }


  create() {
    if (this.user.password === this.password_confirm) {
      this.userService.post(this.user).subscribe(
        user => this.createdSuccess(user),
        error => this.notify.serviceError(error)
      );
    } else {
      this.notify.error('Las contraseñas no coinciden');
    }
  }

  update() {
    this.userService.put(this.user).subscribe(
      user => this.updatedSuccess(user),
      error => this.notify.serviceError(error)
    );
  }

  delete() {
    this.userService.delete(this.user.id).subscribe(
      response => {
        this.deletedSuccess(this.user);
      },
      error => this.notify.serviceError(error)
    );
  }

  clear() {
    this.user = null;
  }
}
