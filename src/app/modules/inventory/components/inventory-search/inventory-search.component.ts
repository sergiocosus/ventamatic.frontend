import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, finalize, map, mergeMap, tap } from 'rxjs/operators';
import { Inventory } from '@app/api/models/inventory.model';
import { InventoryService } from '@app/api/services/inventory.service';
import { BaseFormControlWrapperValueAccessor } from '@app/shared/classes/base-form-control-wrapper-value-accessor';

@Component({
  selector: 'app-inventory-search',
  templateUrl: './inventory-search.component.html',
  styleUrls: ['./inventory-search.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InventorySearchComponent),
    multi: true
  }]
})
export class InventorySearchComponent extends BaseFormControlWrapperValueAccessor implements OnInit {
  @Input() placeholder = 'Nombre del producto';
  @Input() branch_id: number;
  @Input() tab_index: number;

  formControl: FormControl;
  inventoriesFound$: Observable<Inventory[]>;
  loading = false;

  constructor(private inventoryService: InventoryService) {
    super();
  }

  ngOnInit() {
    this.initSearch();
  }

  /**
   * Initialize the field control to search when there is changes
   */
  private initSearch() {
    this.inventoriesFound$ = this.formControl.valueChanges.pipe(
      tap(() => this.loading = true),
      debounceTime(250),
      distinctUntilChanged(), mergeMap(
        value => this.inventoryService.search(this.branch_id, value).pipe(
          catchError(err => from([])),
          finalize(() => this.loading = false)
        ),
      )
    );
  }

  displayWith(inventory: Inventory) {
    return inventory ? inventory.product.description : '';
  }

  registerOnChange(fn: any): void {
    this.sub.add = this.formControl.valueChanges.pipe(
      map(value => typeof value === 'string' ? null : value),
      filter(value => value instanceof Inventory || !value)
    ).subscribe(fn);
  }
}
