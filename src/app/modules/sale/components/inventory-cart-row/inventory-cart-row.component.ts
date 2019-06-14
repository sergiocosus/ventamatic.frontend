import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ProductSale} from '../../../api/interfaces/product-sale';
import { FormControl } from '@angular/forms';
import { Inventory } from '@app/api/models/inventory.model';

@Component({
  selector: 'app-inventory-cart-row',
  templateUrl: './inventory-cart-row.component.html',
  styleUrls: ['./inventory-cart-row.component.scss']
})
export class InventoryCartRowComponent implements OnInit, AfterViewInit {
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
