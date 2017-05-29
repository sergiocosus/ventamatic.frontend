import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {PersonItemComponent} from "../../../components/person-item/person-item.component";

@Component({
  selector: 'client-item',
  templateUrl: 'client-item.component.html',
  styleUrls: ['client-item.component.scss']
})
export class ClientItemComponent implements OnInit {
  @Input() client:any;

  @Output() delete = new EventEmitter();
  @Output() restore = new EventEmitter();
  @Output() update = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

}
