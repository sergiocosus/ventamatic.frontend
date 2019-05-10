import { catchError, debounceTime, distinctUntilChanged, filter, finalize, map, mergeMap, tap } from 'rxjs/operators';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Branch } from '@app/api/models/branch';
import { BranchService } from '@app/api/services/branch.service';
import { from, Observable } from 'rxjs';
import { Product } from '@app/api/models/product';
import { BaseFormControlWrapperValueAccessor } from '@app/shared/classes/base-form-control-wrapper-value-accessor';

@Component({
  selector: 'app-branch-search',
  templateUrl: './branch-search.component.html',
  styleUrls: ['./branch-search.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BranchSearchComponent),
    multi: true
  }]
})
export class BranchSearchComponent extends BaseFormControlWrapperValueAccessor implements OnInit {
  @Input() placeholder = 'Sucursal';
  @Input() tab_index;

  formControl: FormControl;
  branchesFound$: Observable<Product[]>;
  loading = false;

  constructor(private branchService: BranchService) {
    super();
  }

  ngOnInit() {
    this.initSearch();
  }

  /**
   * Initialize the immediate boss person field to search when there is changes
   */
  private initSearch() {
    this.branchesFound$ = this.formControl.valueChanges.pipe(
      tap(() => this.loading = true),
      debounceTime(250),
      distinctUntilChanged(), mergeMap(
        value => this.branchService.getSearch(value).pipe(
          catchError(err => from([])),
          finalize(() => this.loading = false)
        )
      )
    );
  }

  displayWith(branch: Branch) {
    return branch ? branch.name : '';
  }

  registerOnChange(fn: any): void {
    this.sub.add = this.formControl.valueChanges.pipe(
      map(value => typeof value === 'string' ? null : value),
      filter(value => value instanceof Branch || !value)
    ).subscribe(fn);
  }
}
