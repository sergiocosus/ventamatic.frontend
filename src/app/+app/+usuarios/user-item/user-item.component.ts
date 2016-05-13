import { Component, OnInit, Input} from '@angular/core';
import {User} from "../../../user/user";

@Component({
  moduleId: module.id,
  selector: 'user-item',
  templateUrl: 'user-item.component.html',
  styleUrls: ['user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() user:User;

  constructor() {}

  ngOnInit() {
  }

}
