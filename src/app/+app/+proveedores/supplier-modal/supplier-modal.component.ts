import { Component, OnInit, ViewChild, Output,EventEmitter } from '@angular/core';
import {Supplier} from "../shared/supplier";
import {ModalComponent, MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {SupplierService} from "../shared/supplier.service";
import {NotificationsService} from "angular2-notifications/lib/notifications.service";
import {FloatingLabelComponent} from "../../../components/floating-label";

@Component({
  moduleId: module.id,
  selector: 'supplier-modal',
  templateUrl: 'supplier-modal.component.html',
  styleUrls: ['supplier-modal.component.css'],
  directives: [MODAL_DIRECTIVES, FloatingLabelComponent]

})
export class SupplierModalComponent implements OnInit {
  @ViewChild(ModalComponent) private modal:ModalComponent;

  @Output() created = new EventEmitter();
  @Output() updated = new EventEmitter();
  @Output() deleted = new EventEmitter();


  updateMode:boolean = false;
  createMode:boolean = false;
  deleteMode:boolean = false;
  locked: boolean = false;
  supplier: Supplier;

  constructor(private supplierService:SupplierService,
              private notification:NotificationsService) {}

  ngOnInit() {
  }

  openCreate(){
    this.supplier = new Supplier();
    this.createMode = true;
    this.updateMode = false;
    this.deleteMode = false;
    this.unlock();
    this.modal.open();
  }

  openUpdate(supplier:Supplier){
    this.supplier = supplier;
    this.createMode = false;
    this.updateMode = true;
    this.deleteMode = false;
    this.lock();
    this.modal.open();
  }

  openDelete(supplier:Supplier){
    this.supplier = supplier;
    this.createMode = false;
    this.updateMode = false;
    this.deleteMode = true;
    this.unlock();
    this.modal.open();
  }

  lock(){
    this.locked = true;
  }

  unlock(){
    this.locked = false;
  }

  create(){
    this.supplierService.post(this.supplier).subscribe(supplier => {
      this.created.emit(supplier);
      this.close();
      this.notification.success('Éxito', 'Suppliere creado');
    });
  }

  update(){
    this.supplierService.put(this.supplier).subscribe(supplier=> {
      this.updated.emit(supplier);
      this.close();
      this.notification.success('Éxito', 'Proveedor modificado');
    });
  }

  delete(){
    this.supplierService.delete(this.supplier.id).subscribe( response => {
        if(response.success){
          this.deleted.emit(this.supplier);
          this.close();
          this.notification.success('Éxito', 'Proveedor eliminado');
        }
      });
  }

  close(){
    this.modal.close();
  }

}
