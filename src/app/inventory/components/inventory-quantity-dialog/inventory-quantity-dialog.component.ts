import {Component, EventEmitter, Output} from '@angular/core';
import {NotifyService} from "../../../services/notify.service";
import {MdDialogRef} from '@angular/material';
import {Inventory} from '../../classes/inventory.model';
import {Branch} from '../../../+app/+sucursales/shared/branch';
import {InventoryService} from '../../services/inventory.service';
import {BranchService} from '../../../+app/+sucursales/shared/branch.service';

@Component({
  selector: 'inventory-quantity-dialog',
  templateUrl: 'inventory-quantity-dialog.component.html',
  styleUrls: ['inventory-quantity-dialog.component.scss'],
})
export class InventoryQuantityDialogComponent  {
  @Output() updated = new EventEmitter;
  name = 'Inventario';

  inventoryMovementTypes = [
    { id:InventoryMovementTypeId.Promocion, text: 'Promoción' },
    { id:InventoryMovementTypeId.Traslado, text: 'Traslado' },
    { id:InventoryMovementTypeId.Conversion, text: 'Conversión' },
    { id:InventoryMovementTypeId.Consesion, text: 'Concesión' },
    { id:InventoryMovementTypeId.Caducado, text: 'Caducado' },
    { id:InventoryMovementTypeId.Ajuste, text: 'Ajuste' },
   /* { id:InventoryMovementTypeId.Compra, text: 'Compra' },
    { id:InventoryMovementTypeId.Venta, text: 'Venta' },*/
  ];

  inventoryMovementType;

  inventory: Inventory;
  inventories: Inventory[];
  branches: Branch[];

  branch_id: number;
  quantity: number = null;
  inventoryConverted: Inventory;
  quantity_converted: number = null;
  destiny_branch_id: number;

  constructor( protected notify: NotifyService,
               protected inventoryService: InventoryService,
               protected branchService: BranchService,
               private dialogRef: MdDialogRef<InventoryQuantityDialogComponent>
             ) {
  }

  ngOnInit() {
  }

  init(inventory:Inventory){
    this.inventory = inventory;

    this.loadBranches();
    this.loadInventories()
  }

  loadBranches() {
    this.branchService.getAll().subscribe(
      branches => this.branches = branches
    )
  }

  loadInventories() {
    this.inventoryService.getAll(this.inventory.branch_id).subscribe(
      inventories => {
        this.inventories = inventories;
      }
    );
  }

  willIncrease(){
    if (!this.inventoryMovementType) return false;

    switch (this.inventoryMovementType.id) {
      case InventoryMovementTypeId.Promocion:
        return true;
    }
  }

  willDecrease() {
    if (!this.inventoryMovementType) return false;

    switch (this.inventoryMovementType.id) {
      case InventoryMovementTypeId.Consesion:
      case InventoryMovementTypeId.Caducado:
        return true;
    }
  }

  willAdjust(){
    if (!this.inventoryMovementType) return false;

    return this.inventoryMovementType.id == InventoryMovementTypeId.Ajuste;
  }

  willTranslate(){
    if (!this.inventoryMovementType) return false;

    return this.inventoryMovementType.id == InventoryMovementTypeId.Traslado;
  }

  willConvert(){
    if (!this.inventoryMovementType) return false;

    return this.inventoryMovementType.id == InventoryMovementTypeId.Conversion;
  }

  get placeholderText() {
    let text = 'Candidad a ';

    if (this.willDecrease() || this.willTranslate()) {
      text += 'diminuir';
    } else if (this.willIncrease()) {
      text += 'aumentar';
    } else if (this.willAdjust()) {
      text += 'disminuir o aumentar';
    } else if (this.willConvert()) {
      text += 'convertir';
    }

    return text;
  }
  max() {
    if (this.willDecrease() || this.willTranslate() || this.willConvert() ) {
      return this.inventory.quantity;
    } else {
      return null;
    }
  }

  min() {
    if (this.willAdjust()){
      return -this.inventory.quantity;
    } else if(this.willConvert()) {
      return 1;
    } else {
      return 0;
    }
  }


  get afterMovementQuantity() {
    if (this.willDecrease() || this.willTranslate() || this.willConvert()) {
      return this.inventory.quantity - (this.quantity-0);
    }
    if (this.willIncrease() || this.willAdjust()) {
      return this.inventory.quantity + (this.quantity-0);
    }
  }

  submit(){
    this.inventoryService.post(
      this.inventory.branch_id,
      this.inventory.product_id,
      {
        quantity: this.quantity,
        inventory_movement_type_id: this.inventoryMovementType.id,
        destiny_branch_id: this.destiny_branch_id,
        quantity_converted: this.quantity_converted,
        product_converted_id: this.inventoryConverted
          ? this.inventoryConverted.product.id : undefined
      }
    ).subscribe(
      inventories => {
        this.notify.success('Inventario del producto actualizado');
        this.updated.emit(inventories);
        this.dialogRef.close();
      }
    );
  }
}

enum InventoryMovementTypeId {
  Promocion = 1,
  Traslado,
  Conversion,
  Consesion,
  Caducado,
  Ajuste,
  Compra,
  Venta
}
