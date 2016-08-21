import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {PersonItemComponent} from "../../../components/person-item";

@Component({
  selector: 'supplier-item',
  templateUrl: 'supplier-item.component.html',
  styleUrls: ['supplier-item.component.scss'],
  directives: [
    PersonItemComponent,
  ]
})
export class SupplierItemComponent implements OnInit {
  @Input() supplier:any;

  @Output() delete = new EventEmitter();
  @Output() update = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

}
