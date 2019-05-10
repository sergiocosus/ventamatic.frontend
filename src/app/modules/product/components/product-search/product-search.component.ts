import { catchError, debounceTime, distinctUntilChanged, filter, finalize, map, mergeMap, tap } from 'rxjs/operators';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { ProductService } from '@app/api/services/product.service';
import { Product } from '@app/api/models/product';
import { BaseFormControlWrapperValueAccessor } from '@app/shared/classes/base-form-control-wrapper-value-accessor';


@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ProductSearchComponent),
    multi: true
  }]
})
export class ProductSearchComponent extends BaseFormControlWrapperValueAccessor implements OnInit {
  @Input() placeholder = 'Nombre de producto';
  @Input() tab_index;

  formControl: FormControl;
  productsFound$: Observable<Product[]>;
  loading = false;

  constructor(private productService: ProductService) {
    super();
  }

  ngOnInit() {
    this.initSearch();
  }

  /**
   * Initialize the immediate boss person field to search when there is changes
   */
  private initSearch() {
    this.productsFound$ = this.formControl.valueChanges.pipe(
      tap(() => this.loading = true),
      debounceTime(250),
      distinctUntilChanged(), mergeMap(
        value => this.productService.search(value).pipe(
          catchError(err => from([])),
          finalize(() => this.loading = false)
        )
      )
    );
  }

  displayWith(product: Product) {
    return product ? product.description : '';
  }

  registerOnChange(fn: any): void {
    this.sub.add = this.formControl.valueChanges.pipe(
      map(value => typeof value === 'string' ? null : value),
      filter(value => value instanceof Product || !value)
    ).subscribe(fn);
  }
}
