import {Component, OnInit, Input} from '@angular/core';
import {ProductBuy} from '../../../api/interfaces/product-buy.model';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss']
})
export class ProductCartComponent implements OnInit {
  @Input() addedProducts: ProductBuy[] = [];
  @Input() introducedAmount: number = null;

  buyEnvironment = environment.buy;

  constructor() {}

  ngOnInit() {
  }

  get total(){
    let total = 0;
    this.addedProducts.forEach(addedProduct => {
      total += addedProduct.cost * addedProduct.quantity;
    });
    return Math.trunc(total * 100) / 100;
  }

  get amountDiference(){
    return this.total - this.introducedAmount;
  }

  removeProduct(producBuy) {
    const index = this.addedProducts.indexOf(producBuy);
    if (index > -1) {
      this.addedProducts.splice(index, 1);
    }
  }
}

