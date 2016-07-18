import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {PersonItemComponent} from "../../../components/person-item/person-item.component";

@Component({
  moduleId: module.id,
  selector: 'branch-item',
  templateUrl: 'branch-item.component.html',
  styleUrls: ['branch-item.component.css'],
  directives: [
    PersonItemComponent
  ]
})
export class BranchItemComponent implements OnInit {
  @Input() branch:any;

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
