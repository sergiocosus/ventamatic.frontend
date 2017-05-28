import {Component, OnInit, ViewChild, HostListener, Output, EventEmitter} from '@angular/core';
import {SelectableComponent} from '../../shared/selectable/selectable.component';
import {PopoverComponent} from '../../shared/popover/popover.component';
import {FormControl} from '@angular/forms';
import {BranchService} from '../../app/+sucursales/shared/branch.service';
import {Branch} from '../../app/+sucursales/shared/branch';
import {NotifyService} from '../../services/notify.service';

@Component({
  selector: 'app-branch-search',
  templateUrl: './branch-search.component.html',
  styleUrls: ['./branch-search.component.scss']
})
export class BranchSearchComponent implements OnInit {
  @ViewChild(SelectableComponent) selectable:SelectableComponent;
  @ViewChild(PopoverComponent) popover:PopoverComponent;
  @Output() selected = new EventEmitter();

  @HostListener('keydown', ['$event']) onKeyDown($event) {
    return this.selectable.keydown($event);
  }

  loading = false;

  id: number;
  name: string;

  nameControl = new FormControl();

  branches: Branch[] = null;


  constructor(private branchService: BranchService,
              private notify: NotifyService) {


    this.nameControl.valueChanges.debounceTime(250).distinctUntilChanged()
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
