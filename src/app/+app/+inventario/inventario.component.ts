import {Component, OnInit, ViewChild} from "@angular/core";

import {SelectBranchComponent} from "./select-branch/select-branch.component";
import {InventoryComponent} from "./inventory/inventory.component";
import {Routes, ROUTER_DIRECTIVES} from "@angular/router";
import {InventoryService} from "../../shared/inventory/inventory.service";
import {Inventory} from "../../shared/inventory/inventory";
import {ModalInventarioComponent} from "./modal-inventario/modal-inventario.component";

@Component({
  moduleId: module.id,
  selector: 'app-inventario',
  templateUrl: 'inventario.component.html',
  styleUrls: ['inventario.component.css'],
  directives: [
    ROUTER_DIRECTIVES
  ]
})

@Routes([
  {path: '', component: SelectBranchComponent},
  {path: '/:branch_id', component: InventoryComponent}
])

export class InventarioComponent implements OnInit {
 
  constructor() {}

  ngOnInit() {
  }

 

}
