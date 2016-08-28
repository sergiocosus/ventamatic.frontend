import {Component, OnInit, Input} from '@angular/core';
import {Product} from "../product";
import {ProductBuy} from "../../buy/product-buy";

@Component({
  selector: 'app-product-cart',
  templateUrl: 'product-cart.component.html',
  styleUrls: ['product-cart.component.scss']
})
export class ProductCartComponent implements OnInit {
  @Input() addedProducts:ProductBuy[] = [];
  @Input() introducedAmount:number = null;


  constructor() {}

  ngOnInit() {
  }


  get total(){
    var total = 0;
    this.addedProducts.forEach(addedProduct => {
      total += addedProduct.cost * addedProduct.quantity;
    });
    return total;
  }

  get amountDiference(){
    return this.introducedAmount - this.total;
  }

  removeProduct(producBuy){
    var index = this.addedProducts.indexOf(producBuy);
    if (index > -1) {
      this.addedProducts.splice(index, 1);
    }
  }


}

