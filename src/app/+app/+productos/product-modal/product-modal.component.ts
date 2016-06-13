import { Component, OnInit, ViewChild, Output } from '@angular/core';
import {FloatingLabelComponent} from "../../../components/floating-label/floating-label.component";
import {MODAL_DIRECTIVES, ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {CrudModalComponent} from "../../../components/crud-modal/crud-modal.component";
import {Product} from "../../../shared/product/product";
import {ProductService} from "../../../shared/product/product.service";
import {NotificationsService} from "angular2-notifications/lib/notifications.service";

@Component({
  moduleId: module.id,
  selector: 'product-modal',
  templateUrl: 'product-modal.component.html',
  styleUrls: ['product-modal.component.css'],
  directives: [MODAL_DIRECTIVES, FloatingLabelComponent]
})
export class ProductModalComponent extends CrudModalComponent {
  @ViewChild(ModalComponent) protected modal:ModalComponent;

  @Output() created;
  @Output() updated;
  @Output() deleted;

  name = 'Producto';

  product: Product;


  constructor(protected productService:ProductService,
              protected notification: NotificationsService) {
    super(notification);
  }

  ngOnInit() {
  }

  openCreate(){
    this.product = new Product();
    super.openCreate();
  }

  openUpdate(product:Product){
    this.product = product;
    super.openUpdate(product);
  }

  openDelete(product:Product){
    this.product = product;
    super.openDelete(product)
  }


  create(){

      this.productService.post(this.product).subscribe(
        product => this.createdSuccess(product)
      );

  }

  update(){
    this.productService.put(this.product).subscribe(product=> {
      this.updatedSuccess(product);
    });
  }

  delete(){
    this.productService.delete(this.product.id).subscribe( response => {
      if(response.success){
        this.deletedSuccess(this.product);
      }
    });
  }

}
