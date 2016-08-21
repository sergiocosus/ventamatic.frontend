import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {User} from "../../../user/user";

@Component({
  selector: 'user-item',
  templateUrl: 'user-item.component.html',
  styleUrls: ['user-item.component.scss']
})
export class UserItemComponent implements OnInit {
  @Input() user:User;

  @Output() delete = new EventEmitter();
  @Output() update = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }
}
