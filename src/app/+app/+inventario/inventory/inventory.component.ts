import {Component, OnInit, ViewChild} from '@angular/core';
import {SelectBranchComponent} from "../select-branch/select-branch.component";
import {Routes, ROUTER_DIRECTIVES, OnActivate, RouteSegment, RouteTree} from "@angular/router";
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



export class InventoryComponent implements  OnActivate {
  @ViewChild(ModalInventarioComponent) private modalInventario:ModalInventarioComponent;
  branch_id:number;
  inventories:Inventory[];

  constructor(private inventoryService:InventoryService) {}


  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
    this.branch_id = +curr.getParam('branch_id');
    this.inventoryService.getAll(this.branch_id).subscribe(
      inventories => {
        this.inventories = inventories;
        console.log(inventories);
      }
    );


  }

  clickUpdate(inventory:Inventory){
    this.modalInventario.openUpdate(inventory);
  }

}
