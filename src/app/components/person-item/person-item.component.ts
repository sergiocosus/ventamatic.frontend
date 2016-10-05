import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'person-item',
  templateUrl: 'person-item.component.html',
  styleUrls: ['person-item.component.scss']
})
export class PersonItemComponent implements OnInit {
  @Input() canDelete:boolean = true;
  @Input() deletePermission:string;

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
