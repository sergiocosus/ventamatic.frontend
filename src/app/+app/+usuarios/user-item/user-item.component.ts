import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {User} from "../../../user/user";

@Component({
  moduleId: module.id,
  selector: 'user-item',
  templateUrl: 'user-item.component.html',
  styleUrls: ['user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() user:User;

  @Output() delete = new EventEmitter();
  @Output() update = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

  clickDelete(){
    this.delete.emit(this.user);
  }
  
  clickUpdate(){
    this.update.emit(this.user);
  }

}
