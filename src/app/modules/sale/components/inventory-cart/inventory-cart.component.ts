import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-inventory-cart',
  templateUrl: './inventory-cart.component.html',
  styleUrls: ['./inventory-cart.component.scss']
})
export class InventoryCartComponent implements OnInit {
  @Input() products_form: FormArray;
  @Input() client_payment: number;

  constructor() {
  }

  ngOnInit() {

  }

  get total() {
    return this.products_form.controls
      .map(productForm =>
        productForm.get('inventory').value.current_price * productForm.get('quantity').value
      )
      .reduce((prev, current) => prev + current, 0);
  }

  get paymentChange() {
    return this.client_payment - this.total;
  }

  removeProduct(i) {
    this.products_form.removeAt(i);
  }
}
