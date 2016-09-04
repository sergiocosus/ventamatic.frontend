import { Component, OnInit, ViewChild, Output,EventEmitter } from '@angular/core';
import {Supplier} from "../shared/supplier";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {SupplierService} from "../shared/supplier.service";
import {NotificationsService} from "angular2-notifications/lib/notifications.service";
import {CrudModalComponent} from "../../../components/crud-modal";
import {SupplierCategoryService} from "../category/supplier-category.service";
import {SupplierCategory} from "../category/supplier-category";

@Component({
  selector: 'supplier-modal',
  templateUrl: 'supplier-modal.component.html',
  styleUrls: ['supplier-modal.component.scss'],
})
export class SupplierModalComponent extends CrudModalComponent {
  @ViewChild(ModalComponent) protected modal:ModalComponent;

  @Output() created;
  @Output() updated;
  @Output() deleted;

  name = 'Proveedor';

  supplier: Supplier;

  supplierCategories:SupplierCategory[] = [];
  supplierCategoryItems:any[] = [];
  selectedSupplierCategoryItem:any;
  constructor(protected supplierService:SupplierService,
              protected notification:NotificationsService,
              protected supplierCategoryService:SupplierCategoryService) {
    super(notification);
  }

  ngOnInit() {
    this.loadSupplierCategories();
  }

  loadSupplierCategories() {
    this.supplierCategoryService.getAll().subscribe(
      supplierCategories => {
        this.supplierCategories = supplierCategories;
        this.supplierCategoryItems = this.supplierCategories.map(
          (supplierCategories:SupplierCategory) => {
            return {text:supplierCategories.name, id:supplierCategories.id};
          }
        );
      }
    );
  }

  openCreate(){
    this.supplier = new Supplier();
    super.openCreate();
  }

  openUpdate(supplier:Supplier){
    this.supplierService.get(supplier.id).subscribe(
      supplier => {
        this.supplier = supplier;
        if(supplier.supplier_category) {
          this.selectedSupplierCategoryItem = [{
            text:supplier.supplier_category.name,
            id:supplier.supplier_category.id
          }];
        }
      }
    );
    super.openUpdate();
  }

  openDelete(supplier:Supplier){
    this.supplier = supplier;
    super.openDelete(supplier)
  }

  create(){
    this.supplierService.post(this.supplier).subscribe(
      supplier => this.createdSuccess(supplier)
    );
  }

  update(){
    this.supplierService.put(this.supplier).subscribe(
      supplier => this.updatedSuccess(supplier)
    );
  }

  delete(){
    this.supplierService.delete(this.supplier.id).subscribe(
      response => {
        this.deletedSuccess(this.supplier);
      }
    );
  }

  closed(){
    console.log('closed');
    this.supplier = null;
    this.selectedSupplierCategoryItem = null;
  }

}
