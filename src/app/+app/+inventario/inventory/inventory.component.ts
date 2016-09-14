import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MainContentComponent} from "../../../shared/main-content/main-content.component";
import {InventoryService} from "../../../shared/inventory/inventory.service";
import {Inventory} from "../../../shared/inventory/inventory";
import {SearchBarComponent} from "../../shared/search-bar/search-bar.component";
import {ModalInventarioComponent} from "../modal-inventario/modal-inventario.component";
import {NotifyService} from "../../../services/notify.service";

@Component({
  selector: 'app-inventory',
  templateUrl: 'inventory.component.html',
  styleUrls: ['inventory.component.scss'],
  providers: [InventoryService]
})



export class InventoryComponent implements OnInit, OnDestroy {
  @ViewChild(ModalInventarioComponent) private modalInventario:ModalInventarioComponent;

  branch_id:number;
  inventories:Inventory[];

  private sub;
  constructor(private route:ActivatedRoute,
              private inventoryService:InventoryService,
              private notify:NotifyService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.branch_id = params['branch_id'];
      this.inventoryService.getAll(this.branch_id).subscribe(
        inventories => {
          this.inventories = inventories;
          console.log(inventories);
        },
        error => this.notify.serviceError(error)
      );
    });
  }

  ngOnDestroy(): any {
    this.sub.unsubscribe();
  }


  clickUpdate(inventory:Inventory){
    this.modalInventario.openUpdate(inventory);
  }

  updated(inventory:Inventory) {
    for ( var index in this.inventories ) {
      if(this.inventories[index].product_id == inventory.product_id) {
        this.inventories[index] = inventory;
        return;
      }
    }
  }



}
