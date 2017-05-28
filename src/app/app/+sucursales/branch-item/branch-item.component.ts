import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';

@Component({
  selector: 'branch-item',
  templateUrl: 'branch-item.component.html',
  styleUrls: ['branch-item.component.scss']
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
