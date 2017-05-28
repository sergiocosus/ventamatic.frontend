import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotifyService} from "../../../services/notify.service";
import {Inventory} from '../../../inventory/classes/inventory.model';
import {InventoryService} from '../../../inventory/services/inventory.service';
import {MdDialog} from '@angular/material';
import {InventoryEditDialogComponent} from '../../../inventory/components/inventory-edit-dialog/inventory-edit-dialog.component';
import {InventoryQuantityDialogComponent} from '../../../inventory/components/inventory-quantity-dialog/inventory-quantity-dialog.component';

@Component({
  selector: 'app-inventory',
  templateUrl: 'inventory.component.html',
  styleUrls: ['inventory.component.scss'],
  providers: [InventoryService]
})
export class InventoryComponent implements OnInit, OnDestroy {
  branch_id:number;
  inventories:Inventory[];

  private sub;
  constructor(private route:ActivatedRoute,
              private inventoryService:InventoryService,
              private notify:NotifyService,
              private dialog: MdDialog) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.branch_id = params['branch_id'];
      this.inventoryService.getAll(this.branch_id).subscribe(
        inventories => {
          this.inventories = inventories;
        },
        error => this.notify.serviceError(error)
      );
    });
  }

  ngOnDestroy(): any {
    this.sub.unsubscribe();
  }


  clickUpdate($event, inventory:Inventory){
    $event.stopPropagation();
    let inventoryQuantityDialog = this.dialog.open(InventoryQuantityDialogComponent);
    inventoryQuantityDialog.componentInstance.init(inventory);
    inventoryQuantityDialog.componentInstance.updated.subscribe(
      inventories => inventories.forEach(
        inventory => this.updated(inventory)
      )
    );
  }

  updated(inventory: Inventory) {
    for ( var index in this.inventories ) {
      if(this.inventories[index].product_id == inventory.product_id) {
        this.inventories[index] = inventory;
        return;
      }
    }
  }

  openUpdateDialog(inventory: Inventory) {
    const dialog = this.dialog.open(InventoryEditDialogComponent);
    dialog.componentInstance.init(inventory);
    dialog.componentInstance.updated.subscribe(
      inventory => this.updated(inventory)
    );
  }
}
