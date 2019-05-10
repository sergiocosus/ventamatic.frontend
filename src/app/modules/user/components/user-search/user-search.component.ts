import { catchError, debounceTime, distinctUntilChanged, filter, finalize, map, mergeMap, tap } from 'rxjs/operators';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { UserService } from '@app/api/services/user.service';
import { User } from '@app/api/models/user';
import { AutoUnsubscribe } from '@app/shared/decorators/auto-unsubscribe';
import { BaseFormControlWrapperValueAccessor } from '@app/shared/classes/base-form-control-wrapper-value-accessor';


@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UserSearchComponent),
    multi: true
  }]
})
@AutoUnsubscribe()
export class UserSearchComponent extends BaseFormControlWrapperValueAccessor implements OnInit {
  @Input() placeholder = 'Nombre de usuario';
  @Input() tab_index;
  idFormControl = new FormControl();

  usersFound$: Observable<User[]>;
  loading = false;


  constructor(private userService: UserService) {
    super();

    this.sub.add = this.idFormControl.valueChanges
      .pipe(mergeMap(value => this.userService.get(value)
        .pipe(catchError(() => from([null])))
      )).subscribe(user => this.formControl.setValue(user, {emitEvent: false}));

    this.registerOnChange(user => this.idFormControl.setValue(
      user ? user.id : null, {emitEvent: false}
    ));
  }

  ngOnInit() {
    this.initSearch();
  }

  /**
   * Initialize the user field to search when there is changes
   */
  private initSearch() {
    this.usersFound$ = this.formControl.valueChanges.pipe(
      tap(() => this.loading = true),
      debounceTime(250),
      distinctUntilChanged(), mergeMap(
        value => this.userService.getSearch(value).pipe(
          catchError(err => from([])),
          finalize(() => this.loading = false)
        )
      )
    );
  }

  displayWith(user: User) {
    return user ? user.name : '';
  }

  registerOnChange(fn: any): void {
    this.sub.add = this.formControl.valueChanges.pipe(
      map(value => typeof value === 'string' ? null : value),
      filter(value => value instanceof User || !value)
    ).subscribe(fn);
  }
}
