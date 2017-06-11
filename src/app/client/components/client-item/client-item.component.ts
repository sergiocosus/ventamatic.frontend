import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Client} from '../../classes/client';

@Component({
  selector: 'app-client-item',
  templateUrl: 'client-item.component.html',
  styleUrls: ['client-item.component.scss']
})
export class ClientItemComponent implements OnInit {
  @Input() client: Client;

  @Output() delete = new EventEmitter();
  @Output() restore = new EventEmitter();
  @Output() update = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

}
