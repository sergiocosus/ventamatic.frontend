import {Component, OnInit, Output, ViewChild} from '@angular/core';
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import {NotificationsService} from "angular2-notifications/lib/notifications.service";
import {Inventory} from "../../../shared/inventory/inventory";
import {InventoryService} from "../../../shared/inventory/inventory.service";
import {CrudModalComponent} from "../../../components/crud-modal/crud-modal.component";
import {Branch} from "../../+sucursales/shared/branch";
import {BranchService} from "../../+sucursales/shared/branch.service";

@Component({
  selector: 'modal-inventario',
  templateUrl: 'modal-inventario.component.html',
  styleUrls: ['modal-inventario.component.scss'],
})
export class ModalInventarioComponent extends CrudModalComponent {
  @ViewChild(ModalComponent) protected modal:ModalComponent;
  @Output() updated;

  name = 'Inventario';

  inventoryMovementTypes = [
    { id:InventoryMovementTypeId.Promocion, name: 'Promoción' },
    { id:InventoryMovementTypeId.Traslado, name: 'Traslado' },
   // { id:InventoryMovementTypeId.Conversion, name: 'Conversión' },
    { id:InventoryMovementTypeId.Consesion, name: 'Concesión' },
    { id:InventoryMovementTypeId.Caducado, name: 'Caducado' },
    { id:InventoryMovementTypeId.Ajuste, name: 'Ajuste' },
   /* { id:InventoryMovementTypeId.Compra, name: 'Compra' },
    { id:InventoryMovementTypeId.Venta, name: 'Venta' },*/
  ];

  inventoryMovementType = {id: 0, name: 'No seleccionado'};

  inventory: Inventory;
  branches: Branch[];

  branch_id:number;

  quantity:number;

  constructor( protected notification: NotificationsService,
               protected inventoryService:InventoryService,
               protected branchService:BranchService
             ) {
    super(notification);
  }

  ngOnInit() {
    this.branchService.getAll().subscribe(
      branches => this.branches = branches
    )
  }

  willIncrease(){
    switch (this.inventoryMovementType.id) {
      case InventoryMovementTypeId.Promocion:
        return true;
    }
  }

  willDecrease() {
    switch (this.inventoryMovementType.id) {
      case InventoryMovementTypeId.Consesion:
      case InventoryMovementTypeId.Caducado:
        return true;
    }
  }

  willAdjust(){
    return this.inventoryMovementType.id == InventoryMovementTypeId.Ajuste;
  }

  willTranslate(){
    return this.inventoryMovementType.id == InventoryMovementTypeId.Traslado;
  }

  max() {
    if (this.willDecrease() || this.willTranslate()) {
      return this.inventory.quantity;
    } else {
      return null;
    }
  }

  min() {
    if (this.willAdjust()){
      return -this.inventory.quantity;
    } else {
      return 0;
    }
  }

  create() {
  }

  delete() {
  }

  update(){
    this.inventoryService.put(
      this.inventory.branch_id,
      this.inventory.product_id,
      {
        quantity: this.quantity,
        inventory_movement_type_id: this.inventoryMovementType.id
      }
    ).subscribe(
      inventory => {
        this.notification.success('Éxito', 'Inventario del producto actualizado');
        this.inventory = inventory;
        this.updated.emit(inventory);
      }
    );
  }


   openUpdate(inventory:Inventory){
    this.inventory = inventory;
    super.openUpdate(Inventory);
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
