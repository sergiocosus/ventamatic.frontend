import { catchError, debounceTime, distinctUntilChanged, finalize, mergeMap, tap } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { ProductService } from '@app/api/services/product.service';
import { Product } from '@app/api/models/product';


@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {
  @Output() optionSelected = new EventEmitter();
  @Input() fieldControl: FormControl;
  @Input() placeholder = 'Nombre de producto';
  @Input() tab_index;

  productsFound$: Observable<Product[]>;
  loading = false;


  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.initSearch();
  }

  /**
   * Initialize the immediate boss person field to search when there is changes
   */
  private initSearch() {
    this.productsFound$ = this.fieldControl.valueChanges.pipe(
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
}
