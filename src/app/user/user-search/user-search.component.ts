import {Component, OnInit, ViewChild, Output, HostListener, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SelectableComponent} from '../../shared/selectable/selectable.component';
import {PopoverComponent} from '../../shared/popover/popover.component';
import {NotifyService} from '../../services/notify.service';
import {UserService} from '../user.service';
import {User} from '../user';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  @ViewChild(SelectableComponent) selectable:SelectableComponent;
  @ViewChild(PopoverComponent) popover:PopoverComponent;
  @Output() selected = new EventEmitter();

  @HostListener('keydown', ['$event']) onKeyDown($event) {
    return this.selectable.keydown($event);
  }

  loading = false;

  id: number;
  name: string;

  idControl = new FormControl();
  nameControl = new FormControl();

  users: User[] = null;


  constructor(private userService: UserService,
              private notify: NotifyService) {
    this.idControl.valueChanges.debounceTime(250).distinctUntilChanged()
      .subscribe(value => {
        this.startLoading();
        if (!value  || value === '' ) { return; }
        this.userService.get(value).subscribe(
          user => this.setUsers([user]),
          error => {
            this.users = null;
            this.loading = false;
          }
        );
      });

    this.nameControl.valueChanges.debounceTime(250).distinctUntilChanged()
      .subscribe(value => {
        this.startLoading();
        if (!value  || value === '' ) { return; }
        this.userService.getSearch(value).subscribe(
          users => this.setUsers(users),
          error => this.notify.serviceError(error)
        );
      });
  }


  startLoading() {
    this.users = null;
    this.loading = true;
  }

  setUsers(users: User[]) {
    this.users = users;
    this.loading = false;
  }

  select($event) {
    this.selected.emit($event);
    this.popover.hidden = true;
  }

  ngOnInit() {
  }
}
