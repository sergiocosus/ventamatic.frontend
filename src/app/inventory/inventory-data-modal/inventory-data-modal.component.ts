import {Component} from '@angular/core';
import {ModalComponent} from 'ng2-bs3-modal/components/modal';
import {Inventory} from '../../shared/inventory/inventory';
import {CrudModalComponent} from '../../components/crud-modal/crud-modal.component';
import {NotifyService} from '../../services/notify.service';
import {InventoryService} from '../../shared/inventory/inventory.service';

@Component({
  selector: 'app-inventory-data-modal',
  templateUrl: './inventory-data-modal.component.html',
  styleUrls: ['./inventory-data-modal.component.scss']
})
export class InventoryDataModalComponent extends CrudModalComponent {
  inventory: Inventory;
  name = 'Producto por sucursal';

  constructor(protected notify: NotifyService,
              protected inventoryService: InventoryService) {
    super(notify);
  }

  openUpdate(inventory:Inventory){
    this.inventory = inventory;
    super.openUpdate(inventory);
  }

  update(){
    this.inventoryService.put(this.inventory).subscribe(user=> {
      this.updatedSuccess(user);
    });
  }

  create() {
  }

  delete() {
  }
}
