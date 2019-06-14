import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-cart-row',
  templateUrl: './product-cart-row.component.html',
  styleUrls: ['./product-cart-row.component.scss']
})
export class ProductCartRowComponent implements OnInit {
  @Input() productBuy: FormGroup;
  @Output() remove = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
