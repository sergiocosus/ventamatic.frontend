import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ProductSale} from '../../../shared/product/inventory-cart/inventory-cart.component';

@Component({
  selector: 'app-product-cart-row',
  templateUrl: './product-cart-row.component.html',
  styleUrls: ['./product-cart-row.component.scss']
})
export class ProductCartRowComponent implements OnInit {
  @ViewChild('input') input: ElementRef;
  @Input() productSale: ProductSale;
  @Output() remove = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    console.log(this.input.nativeElement.focus());
  }
}
