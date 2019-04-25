import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {InventoryMovementTypeId} from '../../../api/classes/inventory-movement-type-id.enum';
import { ProductBuy } from '../../../api/interfaces/product-buy.model';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: 'add-product-dialog.component.html',
  styleUrls: ['add-product-dialog.component.scss']
})
export class AddProductDialogComponent implements OnInit {
  @Output() completed = new EventEmitter<ProductBuy>();

  inventoryMovementTypes = [
    {id: InventoryMovementTypeId.Compra, text: 'Compra'},
    {id: InventoryMovementTypeId.Promocion, text: 'Promoción'},
    {id: InventoryMovementTypeId.Consignacion, text: 'Consignación'}
  ];

  productBuy: ProductBuy = {
    product: null,
    quantity: null,
    cost: null,
    inventoryMovementType: null
  };

  constructor(private dialogRef: MatDialogRef<AddProductDialogComponent>) {
  }

  ngOnInit() {
  }

  init(productBuy: ProductBuy) {
    this.productBuy = productBuy;
    this.productBuy.inventoryMovementType = this.inventoryMovementTypes[0];
  }

  submit() {
    this.completed.emit(this.productBuy);
    this.dialogRef.close();
  }

}
