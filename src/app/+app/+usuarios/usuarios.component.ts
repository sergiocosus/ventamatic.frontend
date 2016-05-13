import { Component, OnInit } from '@angular/core';
import {User} from "../../user/user";
import {UserService} from "../../user/user.service";
import {UserItemComponent} from "./user-item/user-item.component";
import {SearchBarComponent} from "../shared/search-bar/search-bar.component";

@Component({
  moduleId: module.id,
  selector: 'app-usuarios',
  templateUrl: 'usuarios.component.html',
  styleUrls: ['usuarios.component.css'],
  directives: [UserItemComponent, SearchBarComponent]
})
export class UsuariosComponent implements OnInit {

  users:User[];

  constructor(private userService:UserService) {}

  ngOnInit() {
    this.userService.getAll()
      .subscribe(
        users => {this.users = users.concat(users.concat(users.concat(users.concat(users)))); }
      )
  }

}
