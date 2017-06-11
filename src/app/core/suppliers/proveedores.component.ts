import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {SupplierService} from '../../supplier/services/supplier.service';
import {Supplier} from '../../supplier/classes/supplier';
import {NotifyService} from '../../shared/services/notify.service';
import {MdDialog} from '@angular/material';
import {SupplierDialogComponent} from '../../supplier/components/supplier-dialog/supplier-dialog.component';
import {BasicEntityDialogComponent} from '../../various/components/basic-entity-dialog/basic-entity-dialog.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: 'proveedores.component.html',
  styleUrls: ['proveedores.component.scss'],
})
export class ProveedoresComponent implements OnInit {
  suppliers: Supplier[];
  public deletedControl = new FormControl();

  constructor(private supplierService: SupplierService,
              private notify: NotifyService,
              private dialog: MdDialog) {
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

  create() {
    const dialog = this.dialog.open(SupplierDialogComponent);
    dialog.componentInstance.initCreate();
    dialog.componentInstance.created.subscribe(createdSupplier => {
      this.suppliers.push(createdSupplier);
    });
  }

  update(supplier: Supplier) {
    const dialog = this.dialog.open(SupplierDialogComponent);
    dialog.componentInstance.initUpdate(supplier);
    dialog.componentInstance.updated.subscribe(updatedSupplier => {
      for (let i = 0; i < this.suppliers.length; i++) {
        if (updatedSupplier.id === this.suppliers[i].id) {
          this.suppliers[i] = updatedSupplier;
        }
      }
    });
  }

  delete(supplier: Supplier) {
    const dialog = this.dialog.open(SupplierDialogComponent);
    dialog.componentInstance.initUpdate(supplier);
    dialog.componentInstance.created.subscribe(deletedSupplier => {
      const index = this.suppliers.indexOf(deletedSupplier);
      if (index > -1) {
        if (this.deletedControl.value) {
          this.suppliers[index].deleted_at = ' ';
        } else {
          this.suppliers.splice(index, 1);
        }
      }
    });
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


  openSupplierCategoryDialog() {
    const dialog = this.dialog.open(BasicEntityDialogComponent);
    dialog.componentInstance.init('supplier-category');
  }

  openBrandDialog() {
    const dialog = this.dialog.open(BasicEntityDialogComponent);
    dialog.componentInstance.init('brand');
  }
}
