import {Component, OnInit, ViewChild, EventEmitter, Output, HostListener} from '@angular/core';
import {SelectableComponent} from '../../shared/selectable/selectable.component';
import {PopoverComponent} from '../../shared/popover/popover.component';
import {FormControl} from '@angular/forms';
import {Product} from '../../shared/product/product';
import {ProductService} from '../../shared/product/product.service';
import {NotifyService} from '../../services/notify.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {
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

  products: Product[] = null;


  constructor(private productService: ProductService,
              private notify: NotifyService) {
    this.idControl.valueChanges.debounceTime(250).distinctUntilChanged()
      .subscribe(value => {
        this.startLoading();
        if (!value  || value === '' ) { return; }
        this.productService.get(value).subscribe(
          product => this.setProducts([product]),
          error => {
            this.products = null;
            this.loading = false;
          }
        );
      });

    this.nameControl.valueChanges.debounceTime(250).distinctUntilChanged()
      .subscribe(value => {
        this.startLoading();
        if (!value  || value === '' ) { return; }
        this.productService.search(value).subscribe(
          products => this.setProducts(products),
          error => this.notify.serviceError(error)
        );
      });
  }

  startLoading() {
    this.products = null;
    this.loading = true;
  }

  setProducts(products: Product[]) {
    this.products = products;
    this.loading = false;
  }

  select($event) {
    this.selected.emit($event);
    this.popover.hidden = true;
  }

  ngOnInit() {
  }
}
