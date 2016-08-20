import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MainContentComponent} from "../../../shared/main-content/main-content.component";
import {FloatingLabelComponent} from "../../../components/floating-label/floating-label.component";
import {InventoryService} from "../../../shared/inventory/inventory.service";
import {Inventory} from "../../../shared/inventory/inventory";
import {SearchBarComponent} from "../../shared/search-bar/search-bar.component";
import {ModalInventarioComponent} from "../modal-inventario/modal-inventario.component";

@Component({
  moduleId: module.id,
  selector: 'app-inventory',
  templateUrl: 'inventory.component.html',
  styleUrls: ['inventory.component.css'],
  directives: [
    FloatingLabelComponent,
    MainContentComponent,
    SearchBarComponent,
    ModalInventarioComponent
  ],providers: [InventoryService]
})



export class InventoryComponent implements OnInit, OnDestroy {
  @ViewChild(ModalInventarioComponent) private modalInventario:ModalInventarioComponent;
  branch_id:number;
  inventories:Inventory[];

  private sub;
  constructor(private route:ActivatedRoute,
              private inventoryService:InventoryService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.branch_id = params['branch_id'];
      this.inventoryService.getAll(this.branch_id).subscribe(
        inventories => {
          this.inventories = inventories;
          console.log(inventories);
        }
      );
    });
  }

  ngOnDestroy(): any {
    this.sub.unsubscribe();
  }


  clickUpdate(inventory:Inventory){
    this.modalInventario.openUpdate(inventory);
  }

}
