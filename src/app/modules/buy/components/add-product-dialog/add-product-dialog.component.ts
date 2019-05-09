import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { InventoryMovementTypeId } from '@app/api/classes/inventory-movement-type-id.enum';
import { ProductBuy } from '@app/api/interfaces/product-buy.model';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public productBuy: ProductBuy = {
                product: null,
                quantity: null,
                cost: null,
                inventory_movement_type: null
              },
              private fb: FormBuilder) {

    this.form = this.fb.group({
      product: [],
      quantity: [],
      cost: [],
      inventory_movement_type: [],
    });

    this.form.patchValue(this.productBuy);
    this.form.get('inventory_movement_type').setValue(this.inventoryMovementTypes[0]);
  }

  ngOnInit() {
  }

  submit() {
    this.dialogRef.close(this.form.getRawValue());
  }

}
