import { Component, OnInit, ViewChild } from '@angular/core';
import {SupplierService} from "./shared/supplier.service";
import {Supplier} from "./shared/supplier";
import {SupplierModalComponent} from "./supplier-modal";
import {NotifyService} from "../../services/notify.service";

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
              private notify:NotifyService) {}

  ngOnInit() {
    this.supplierService.getAll().subscribe(
      suppliers => this.suppliers = suppliers,
      error => this.notify.serviceError(error)
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
