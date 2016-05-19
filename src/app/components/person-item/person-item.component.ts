import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'person-item',
  templateUrl: 'person-item.component.html',
  styleUrls: ['person-item.component.css']
})
export class PersonItemComponent implements OnInit {
  @Output() delete = new EventEmitter();
  @Output() update = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

  clickDelete(){
    this.delete.emit('delete');
  }

  clickUpdate(){
    this.update.emit('update');
  }
}
