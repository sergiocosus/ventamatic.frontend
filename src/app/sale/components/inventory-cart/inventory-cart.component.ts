import {Component, OnInit, Input } from '@angular/core';
import {ProductSale} from '../../classes/product-sale';

@Component({
  selector: 'app-inventory-cart',
  templateUrl: 'inventory-cart.component.html',
  styleUrls: ['inventory-cart.component.scss']
})
export class InventoryCartComponent implements OnInit {
  @Input() addedProducts: ProductSale[] = [];
  @Input() payment: number = null;

  constructor() {}

  ngOnInit() {

  }

  get total(){
    let total = 0;
    this.addedProducts.forEach(addedProduct => {
      total += addedProduct.inventory.current_price * addedProduct.quantity;
    });
    return total;
  }

  get paymentChange(){
    return this.payment - this.total;
  }

  removeProduct(productSale) {
    const index = this.addedProducts.indexOf(productSale);
    if (index > -1) {
      this.addedProducts.splice(index, 1);
    }
  }
}
