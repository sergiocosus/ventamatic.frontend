import { Component, OnInit, ViewChild, Output,EventEmitter } from '@angular/core';
import {Supplier} from "../shared/supplier";
import {ModalComponent, MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {SupplierService} from "../shared/supplier.service";
import {NotificationsService} from "angular2-notifications/lib/notifications.service";
import {FloatingLabelComponent} from "../../../components/floating-label";
import {CrudModalComponent} from "../../../components/crud-modal/crud-modal.component";

@Component({
  moduleId: module.id,
  selector: 'supplier-modal',
  templateUrl: 'supplier-modal.component.html',
  styleUrls: ['supplier-modal.component.css'],
  directives: [MODAL_DIRECTIVES, FloatingLabelComponent]

})
export class SupplierModalComponent extends CrudModalComponent {
  @ViewChild(ModalComponent) protected modal:ModalComponent;

  @Output() created;
  @Output() updated;
  @Output() deleted;

  name = 'Proveedor';

  supplier: Supplier;

  constructor(protected supplierService:SupplierService,
              protected notification:NotificationsService) {
    super(notification);
  }

  ngOnInit() {
  }

  openCreate(){
    this.supplier = new Supplier();
    super.openCreate();
  }

  openUpdate(supplier:Supplier){
    this.supplier = supplier;
    super.openUpdate(supplier);
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
    this.supplierService.delete(this.supplier.id).subscribe( response => {
        if(response.success) {
          this.deletedSuccess(this.supplier);
        }
      });
  }
}
