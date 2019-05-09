import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ProductSale} from '../../../api/interfaces/product-sale';
import { FormControl } from '@angular/forms';
import { Inventory } from '@app/api/models/inventory.model';

@Component({
  selector: 'app-product-cart-row',
  templateUrl: './product-cart-row.component.html',
  styleUrls: ['./product-cart-row.component.scss']
})
export class ProductCartRowComponent implements OnInit, AfterViewInit {
  @ViewChild('input') input: ElementRef;
  @Input() inventory: Inventory;
  @Input() quantityControl: FormControl;
  @Output() remove = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.input.nativeElement.focus());
  }
}
