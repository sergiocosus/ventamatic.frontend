import { catchError, debounceTime, distinctUntilChanged, filter, finalize, map, mergeMap, tap } from 'rxjs/operators';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Supplier } from '@app/api/models/supplier';
import { SupplierService } from '@app/api/services/supplier.service';
import { from, Observable } from 'rxjs';
import { AutoUnsubscribe } from '@app/shared/decorators/auto-unsubscribe';
import { BaseFormControlWrapperValueAccessor } from '@app/shared/classes/base-form-control-wrapper-value-accessor';

@Component({
  selector: 'app-supplier-search',
  templateUrl: './supplier-search.component.html',
  styleUrls: ['./supplier-search.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SupplierSearchComponent),
    multi: true
  }]
})
@AutoUnsubscribe()
export class SupplierSearchComponent extends BaseFormControlWrapperValueAccessor implements OnInit {
  @Input() placeholder = 'Nombre del proveedor';
  @Input() tab_index;
  idFormControl = new FormControl();

  suppliersFound$: Observable<Supplier[]>;
  loading = false;


  constructor(private userService: SupplierService) {
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
    this.suppliersFound$ = this.formControl.valueChanges.pipe(
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

  displayWith(supplier: Supplier) {
    return supplier ? supplier.name : '';
  }

  registerOnChange(fn: any): void {
    this.sub.add = this.formControl.valueChanges.pipe(
      map(value => typeof value === 'string' ? null : value),
      filter(value => value instanceof Supplier || !value)
    ).subscribe(fn);
  }
}
