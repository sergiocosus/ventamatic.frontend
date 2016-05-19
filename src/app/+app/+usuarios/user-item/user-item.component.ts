import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {User} from "../../../user/user";
import {PersonItemComponent} from "../../../components/person-item/person-item.component";

@Component({
  moduleId: module.id,
  selector: 'user-item',
  templateUrl: 'user-item.component.html',
  styleUrls: ['user-item.component.css'],
  directives: [PersonItemComponent]
})
export class UserItemComponent implements OnInit {
  @Input() user:User;

  @Output() delete = new EventEmitter();
  @Output() update = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }
}
