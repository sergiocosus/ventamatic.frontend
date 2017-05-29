import { Component, OnInit, ViewChild } from '@angular/core';
import {SupplierService} from "./shared/supplier.service";
import {Supplier} from "./shared/supplier";
import {SupplierModalComponent} from "./supplier-modal";
import {NotifyService} from "../../services/notify.service";
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-proveedores',
  templateUrl: 'proveedores.component.html',
  styleUrls: ['proveedores.component.scss'],
  providers: [SupplierService]
})
export class ProveedoresComponent implements OnInit {
  @ViewChild(SupplierModalComponent) private supplierModal:SupplierModalComponent;

  suppliers:Supplier[];
  public deletedControl = new FormControl();

  constructor(private supplierService:SupplierService,
              private notify:NotifyService) {
    this.deletedControl.valueChanges.subscribe(
      showDeleted => this.loadSuppliers()
    );
  }

  ngOnInit() {
    this.loadSuppliers();
  }

  loadSuppliers() {
    const params = {
      deleted: this.deletedControl.value
    };

    this.supplierService.getAll(params).subscribe(
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

  restore(supplier: Supplier) {
    this.supplierService.restore(supplier.id).subscribe(
      clientRestored => {
        const index = this.suppliers.indexOf(supplier);
        if (index > -1) {
          this.suppliers[index] = clientRestored;
        }

        this.notify.success('Proveedor restaurado');
      },
      error => this.notify.serviceError(error)
    );
  }

  created(supplier:Supplier){
    this.suppliers.push(supplier);
  }

  updated(supplier:Supplier){
    for (var i=0; i<this.suppliers.length; i++) {
      if (supplier.id == this.suppliers[i].id) {
        this.suppliers[i] = supplier;
      }
    }
  }

  deleted(supplier: Supplier){
    const index = this.suppliers.indexOf(supplier);
    if (index > -1) {
      if (this.deletedControl.value) {
        this.suppliers[index].deleted_at = ' ';
      } else {
        this.suppliers.splice(index, 1);
      }
    }
  }
}
