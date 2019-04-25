
import {distinctUntilChanged, debounceTime} from 'rxjs/operators';
import {Component, OnInit, ViewChild, HostListener, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Branch} from '../../../api/models/branch';
import {BranchService} from '../../../api/services/branch.service';
import {SelectableComponent} from '../../../../shared/components/selectable/selectable.component';
import {PopoverComponent} from '../../../../shared/components/popover/popover.component';
import {NotifyService} from '../../../../shared/services/notify.service';

@Component({
  selector: 'app-branch-search',
  templateUrl: './branch-search.component.html',
  styleUrls: ['./branch-search.component.scss']
})
export class BranchSearchComponent implements OnInit {
  @ViewChild(SelectableComponent) selectable: SelectableComponent;
  @ViewChild(PopoverComponent) popover: PopoverComponent;
  @Output() selected = new EventEmitter();

  loading = false;
  id: number;
  name: string;
  nameControl = new FormControl();
  branches: Branch[] = null;

  @HostListener('keydown', ['$event']) onKeyDown($event) {
    return this.selectable.keydown($event);
  }

  constructor(private branchService: BranchService,
              private notify: NotifyService) {


    this.nameControl.valueChanges.pipe(debounceTime(250),distinctUntilChanged(),)
      .subscribe(value => {
        this.startLoading();
        if (!value  || value === '' ) { return; }
        this.branchService.getSearch(value).subscribe(
          branchs => this.setBranchs(branchs),
          error => this.notify.serviceError(error)
        );
      });
  }


  startLoading() {
    this.branches = null;
    this.loading = true;
  }

  setBranchs(branches: Branch[]) {
    this.branches = branches;
    this.loading = false;
  }

  select($event) {
    this.selected.emit($event);
    this.popover.hidden = true;
  }

  ngOnInit() {
  }
}
