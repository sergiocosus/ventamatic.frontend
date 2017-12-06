import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {InventoryService} from '../../services/inventory.service';
import {MdDialogRef} from '@angular/material';
import {Inventory} from '../../classes/inventory.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NotifyService} from '../../../shared/services/notify.service';

@Component({
  selector: 'app-inventory-edit-dialog',
  templateUrl: './inventory-edit-dialog.component.html',
  styleUrls: ['./inventory-edit-dialog.component.scss']
})
export class InventoryEditDialogComponent implements OnInit {
  @Output() updated = new EventEmitter();

  public inventory: Inventory;
  public form: FormGroup;

  constructor(private inventoryService: InventoryService,
              private dialogRef: MdDialogRef<InventoryEditDialogComponent>,
              private fb: FormBuilder,
              private noty: NotifyService) {
    this.form = this.fb.group({
      price: ['', []],
      minimum: [null, []],
      last_cost: [null, []],
      branch_id: null,
      product_id: null,
    });
  }

  ngOnInit() {
  }

  init(inventory: Inventory) {
    this.inventory = inventory;
    this.form.patchValue({
      minimum: inventory.minimum,
      price: inventory.price,
      last_cost: inventory.last_cost,
      branch_id: inventory.branch_id,
      product_id: inventory.product_id
    });
  }

  setGlobalPrice() {
    this.form.patchValue({price: this.inventory.product.price});
  }

  setGlobalMinimum() {
    this.form.patchValue({minimum: this.inventory.product.global_minimum});
  }


  submit() {
    this.inventoryService.put(this.form.getRawValue()).subscribe(
      inventory => {
        this.noty.success('Datos actualizados');
        this.updated.emit(inventory);
        this.dialogRef.close();
      },
      error => {
        this.noty.serviceError(error);
      }
    );
  }

}
