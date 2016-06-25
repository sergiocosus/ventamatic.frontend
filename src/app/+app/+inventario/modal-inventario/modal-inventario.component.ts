import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {FloatingLabelComponent} from "../../../components/floating-label/floating-label.component";
import {MODAL_DIRECTIVES, ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {ProductService} from "../../../shared/product/product.service";
import {NotificationsService} from "angular2-notifications/lib/notifications.service";
import {Inventory} from "../../../shared/inventory/inventory";
import {InventoryService} from "../../../shared/inventory/inventory.service";

@Component({
  moduleId: module.id,
  selector: 'app-modal-inventario',
  templateUrl: 'modal-inventario.component.html',
  styleUrls: ['modal-inventario.component.css'],
  directives: [MODAL_DIRECTIVES, FloatingLabelComponent]
})
export class ModalInventarioComponent implements OnInit {
  @ViewChild(ModalComponent) protected modal:ModalComponent;
  @Output() updated;

  name = 'Producto';

  inventory: Inventory;

  constructor(protected inventoryService:InventoryService,
              protected notification: NotificationsService) {
  }

  ngOnInit() {
  }
  openUpdate(inventory:Inventory){
    this.inventory = inventory;
  }

  update(){
/*    this.inventoryService.put(this.inventory).subscribe(product=> {
      this.updatedSuccess(product);
    });*/
  }

}
