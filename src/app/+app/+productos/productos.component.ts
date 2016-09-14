import { Component, OnInit, ViewChild} from '@angular/core';
import {SearchBarComponent} from "../shared/search-bar/search-bar.component";
import {MainContentComponent} from "../../shared/main-content/main-content.component";
import {ProductService} from "../../shared/product/product.service";
import {Product} from "../../shared/product/product";
import {ProductModalComponent} from "./product-modal/product-modal.component";
import {NotifyService} from "../../services/notify.service";


@Component({
  selector: 'app-productos',
  templateUrl: 'productos.component.html',
  styleUrls: ['productos.component.scss']
})
export class ProductosComponent implements OnInit {
  @ViewChild(ProductModalComponent) private productModal:ProductModalComponent;
  public products:Product[];

  constructor(private productService:ProductService,
              private notify:NotifyService) {}

  ngOnInit() {
    this.productService.getAll().subscribe(
      products => {
        console.log(products);
        this.products = products;
      },
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

  clickCreate(product:Product){
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
    var index = this.products.indexOf(product);
    if (index > -1) {
      this.products.splice(index, 1);
    }
  }


}
