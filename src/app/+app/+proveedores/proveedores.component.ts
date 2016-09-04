import { Component, OnInit, ViewChild } from '@angular/core';
import {SearchBarComponent} from "../shared/search-bar";
import {MainContentComponent} from "../../shared/main-content";
import {SupplierItemComponent} from "./supplier-item";
import {SupplierService} from "./shared/supplier.service";
import {Supplier} from "./shared/supplier";
import {NotificationsService} from "angular2-notifications/lib/notifications.service";
import {SupplierModalComponent} from "./supplier-modal";

@Component({
  selector: 'app-proveedores',
  templateUrl: 'proveedores.component.html',
  styleUrls: ['proveedores.component.scss'],
  providers: [SupplierService]
})
export class ProveedoresComponent implements OnInit {
  @ViewChild(SupplierModalComponent) private supplierModal:SupplierModalComponent;

  suppliers:Supplier[];

  constructor(private supplierService:SupplierService,
              private notification:NotificationsService) {}

  ngOnInit() {
    this.supplierService.getAll().subscribe(
      suppliers => this.suppliers = suppliers
    );
  }

  create(){
    this.supplierModal.openCreate();
  }

  update(supplier:Supplier){
    this.supplierModal.openUpdate(supplier);
  }

  delete(supplier:Supplier){
    this.supplierModal.openDelete(supplier);
  }

  created(supplier:Supplier){
    this.suppliers.push(supplier);
  }

  updated(supplier:Supplier){
    for(var i=0; i<this.suppliers.length; i++) {
      if (supplier.id == this.suppliers[i].id) {
        this.suppliers[i] = supplier;
      }
    }
  }

  deleted(supplier:Supplier){
    var index = this.suppliers.indexOf(supplier);
    if (index > -1) {
      this.suppliers.splice(index, 1);
    }
  }

}
