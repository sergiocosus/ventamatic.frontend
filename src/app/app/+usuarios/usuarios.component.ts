import { Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../user/user";
import {UserService} from "../../user/user.service";
import {UserModalComponent} from "./user-modal";
import {NotifyService} from "../../services/notify.service";
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-usuarios',
  templateUrl: 'usuarios.component.html',
  styleUrls: ['usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  @ViewChild(UserModalComponent) private userModal:UserModalComponent;

  users:User[];
  public deletedControl = new FormControl();

  constructor(private userService: UserService,
              private notify: NotifyService) {
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
    this.userModal.openCreate();
  }

  update(user:User) {
    this.userModal.openUpdate(user);
  }

  delete(user:User) {
    this.userModal.openDelete(user);
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

  created(user:User) {
    this.users.unshift(user);
  }

  updated(user:User) {

  }

  deleted(user: User){
    const index = this.users.indexOf(user);
    if (index > -1) {
      if (this.deletedControl.value) {
        this.users[index].deleted_at = ' ';
      } else {
        this.users.splice(index, 1);
      }
    }
  }
}
