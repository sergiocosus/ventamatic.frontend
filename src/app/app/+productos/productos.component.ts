import { Component, OnInit, ViewChild} from '@angular/core';
import {SearchBarComponent} from "../shared/search-bar/search-bar.component";
import {MainContentComponent} from "../../shared/main-content/main-content.component";
import {ProductService} from "../../shared/product/product.service";
import {Product} from "../../shared/product/product";
import {ProductModalComponent} from "./product-modal/product-modal.component";
import {NotifyService} from "../../services/notify.service";
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-productos',
  templateUrl: 'productos.component.html',
  styleUrls: ['productos.component.scss']
})
export class ProductosComponent implements OnInit {
  @ViewChild(ProductModalComponent) public productModal:ProductModalComponent;
  public products:Product[];
  public deletedControl = new FormControl();

  constructor(private productService:ProductService,
              private notify:NotifyService) {
    this.deletedControl.valueChanges.subscribe(
      showDeleted => this.loadProducts()
    );
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = [];
    const params = {
      deleted: this.deletedControl.value
    };

    this.productService.getAll(params).subscribe(
      products => this.products = products,
      error => this.notify.serviceError(error)
    );
  }

  clickUpdate(product:Product){
    this.update(product);
  }

  clickDelete($event, product:Product){
    $event.preventDefault();
    $event.stopPropagation();
    this.delete(product);
  }

  clickRestore($event, product: Product) {
    $event.preventDefault();
    $event.stopPropagation();

    this.productService.restore(product.id).subscribe(
      productRestored => {
        const index = this.products.indexOf(product);
        if (index > -1) {
          this.products[index] = productRestored;
        }

        this.notify.success('Producto restaurado');
      },
      error => this.notify.serviceError(error)
    );
  }

  clickCreate(){
    this.create();
  }

  update(product:Product) {
    this.productModal.openUpdate(product);
  }

  create(){
    this.productModal.openCreate();
  }

  delete(product:Product){
    this.productModal.openDelete(product);
  }

  created(product:Product){
    this.products.push(product);
  }

  updated(product:Product){
    for(var i=0; i<this.products.length; i++) {
      if(product.id == this.products[i].id) {
        this.products[i] = product;
      }
    }
  }

  deleted(product:Product){
    let index = this.products.indexOf(product);
    if (index > -1) {
      if (this.deletedControl.value) {
        this.products[index].deleted_at = ' ';
      } else {
        this.products.splice(index, 1);
      }
    }
  }
}
