import {Component, OnInit, Input} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss']
})
export class ProductCartComponent implements OnInit {
  @Input() addedProducts: FormArray;
  @Input() introducedAmount: number = null;

  buyEnvironment = environment.buy;

  constructor() {}

  ngOnInit() {
  }

  get total() {
    return this.addedProducts.controls
      .map(productForm =>
        productForm.get('cost').value * productForm.get('quantity').value
      ).reduce((prev, current) => prev + current, 0);
  }

  get amountDiference(){
    return this.total - this.introducedAmount;
  }

  removeProduct(index) {
    this.addedProducts.removeAt(index);
  }
}

