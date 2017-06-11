import {Component, OnInit, Input, TemplateRef, Output, EventEmitter, ContentChild} from '@angular/core';

@Component({
  selector: 'app-selectable',
  templateUrl: './selectable.component.html',
  styleUrls: ['./selectable.component.scss']
})
export class SelectableComponent implements OnInit {
  @ContentChild(TemplateRef) template: TemplateRef<any>;

  @Input() items: any[];
  @Input() loading = false;
  @Output() selected = new EventEmitter();

  searching = false;
  selectedIndex = 0;
  constructor() { }

  ngOnInit() {
  }

  keydown($event) {
    if (!(this.items && this.items.length)) {
      return;
    }

    if ($event.code === 'Enter') {
      if (this.items.length) {
        this.selected.emit(this.items[this.selectedIndex]);
        return false;
      }
    } else if ($event.code === 'ArrowUp') {
      if (this.selectedIndex > 0) {
        this.selectedIndex--;
        return false;
      }
    } else if ($event.code === 'ArrowDown') {
      if (this.selectedIndex < (this.items.length - 1)) {
        this.selectedIndex++;
      }
      return false;
    } else if ($event.code === 'Escape') {
      return false;
    }
    return true;
  }

  clear() {
    this.items = null;
    this.selectedIndex = 0;
  }


}
