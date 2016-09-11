import {Component, OnInit, Output, ViewChild} from '@angular/core';
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import {Inventory} from "../../../shared/inventory/inventory";
import {InventoryService} from "../../../shared/inventory/inventory.service";
import {CrudModalComponent} from "../../../components/crud-modal/crud-modal.component";
import {Branch} from "../../+sucursales/shared/branch";
import {BranchService} from "../../+sucursales/shared/branch.service";
import {NotifyService} from "../../../services/notify.service";

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
    { id:InventoryMovementTypeId.Promocion, text: 'Promoción' },
    { id:InventoryMovementTypeId.Traslado, text: 'Traslado' },
   // { id:InventoryMovementTypeId.Conversion, text: 'Conversión' },
    { id:InventoryMovementTypeId.Consesion, text: 'Concesión' },
    { id:InventoryMovementTypeId.Caducado, text: 'Caducado' },
    { id:InventoryMovementTypeId.Ajuste, text: 'Ajuste' },
   /* { id:InventoryMovementTypeId.Compra, text: 'Compra' },
    { id:InventoryMovementTypeId.Venta, text: 'Venta' },*/
  ];

  inventoryMovementType = {id: 0, text: 'No seleccionado'};

  inventory: Inventory;
  branches: Branch[];
  branchesMapped:any[];


  branch_id:number;
  quantity:number;
  destiny_branch_id:number;

  constructor( protected notify: NotifyService,
               protected inventoryService:InventoryService,
               protected branchService:BranchService
             ) {
    super(notify);
  }

  ngOnInit() {
    this.branchService.getAll().subscribe(
      branches => {
        for(var i in branches) {
          if(branches[i].id == branches[i].id) {
            branches.splice(<any>i, 1);
          }
        }
        this.branchesMapped = branches.map(
          branch => {
            return {id: branch.id, text: branch.name};
          }
        )
      }
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
        inventory_movement_type_id: this.inventoryMovementType.id,
        destiny_branch_id: this.destiny_branch_id
      }
    ).subscribe(
      inventory => {
        this.notify.success('Inventario del producto actualizado');
        this.inventory = inventory;
        this.updated.emit(inventory);
        this.close();
      }
    );
  }

   openUpdate(inventory:Inventory){
    this.inventory = inventory;
    super.openUpdate(Inventory);
   }

   clear(){
     this.inventoryMovementType = {id: 0, text: 'No seleccionado'};

     this.inventory = null;
     this.branches = [];
     this.branchesMapped = [];


     this.branch_id = null;
     this.quantity = null;
     this.destiny_branch_id = null;

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
