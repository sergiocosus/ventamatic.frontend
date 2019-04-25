import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {User} from '../../../api/models/user';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {
  @Input() user: User;

  @Output() delete = new EventEmitter();
  @Output() restore = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() roles = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

  clickRole($event) {
    $event.stopPropagation();
    this.roles.emit(this.user);
  }
}
