import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {FloatingLabelComponent} from "../../../components/floating-label/floating-label.component";
import {MODAL_DIRECTIVES, ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {ProductService} from "../../../shared/product/product.service";
import {NotificationsService} from "angular2-notifications/lib/notifications.service";
import {Inventory} from "../../../shared/inventory/inventory";
import {InventoryService} from "../../../shared/inventory/inventory.service";
import {CrudModalComponent} from "../../../components/crud-modal/crud-modal.component";

@Component({
  moduleId: module.id,
  selector: 'modal-inventario',
  templateUrl: 'modal-inventario.component.html',
  styleUrls: ['modal-inventario.component.css'],
  directives: [MODAL_DIRECTIVES, FloatingLabelComponent]
})
export class ModalInventarioComponent extends CrudModalComponent {
  create() {
  }

  delete() {
  }
  @ViewChild(ModalComponent) protected modal:ModalComponent;
  @Output() updated;

  name = 'Inventario';

  inventory: Inventory;

  constructor( protected notification: NotificationsService,
               protected inventoryService:InventoryService
             ) {
    super(notification);
  }

  ngOnInit() {
  }

  update(){
/*    this.inventoryService.put(this.inventory).subscribe(product=> {
      this.updatedSuccess(product);
    });*/
  }


   openUpdate(inventory:Inventory){
    this.inventory = inventory;
    super.openUpdate(Inventory);
   }

}
