import { Component, OnInit, Input } from '@angular/core';
import {Inventory} from "../../inventory/inventory";

@Component({
  moduleId: module.id,
  selector: 'app-product-cart',
  templateUrl: 'product-cart.component.html',
  styleUrls: ['product-cart.component.css']
})
export class ProductCartComponent implements OnInit {
  @Input() addedProducts:ProductSale[] = [];
  @Input() payment:number = null;


  constructor() {}

  ngOnInit() {
  }


  get total(){
    var total = 0;
    this.addedProducts.forEach(addedProduct => {
      total += addedProduct.inventory.correctPrice * addedProduct.quantity;
    });
    return total;
  }

  get paymentChange(){
    return this.payment - this.total;
  }

  removeProduct(productSale){
    var index = this.addedProducts.indexOf(productSale);
    if (index > -1) {
      this.addedProducts.splice(index, 1);
    }
  }

}

interface ProductSale {
  inventory:Inventory;
  quantity:number;
}
