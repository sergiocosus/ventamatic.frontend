import { Component, OnInit, ViewChild} from '@angular/core';
import {SearchBarComponent} from "../shared/search-bar/search-bar.component";
import {MainContentComponent} from "../../shared/main-content/main-content.component";
import {ProductService} from "../../shared/product/product.service";
import {Product} from "../../shared/product/product";
import {ProductModalComponent} from "./product-modal/product-modal.component";


@Component({
  moduleId: module.id,
  selector: 'app-productos',
  templateUrl: 'productos.component.html',
  styleUrls: ['productos.component.css'],
  directives: [SearchBarComponent,MainContentComponent,ProductModalComponent]
})
export class ProductosComponent implements OnInit {
  @ViewChild(ProductModalComponent) private productModal:ProductModalComponent;
  public products:Product[];

  constructor(private productService:ProductService) {}

  ngOnInit() {
    this.productService.getAll().subscribe(products => {
      console.log(products);
      this.products = products;
    });
  }

  clickUpdate(product:Product){
    this.update(product);
  }

  clickDelete(product:Product){
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
    this.products.unshift(product);
  }

  updated(product:Product){

  }

  deleted(product:Product){
    var index = this.products.indexOf(product);
    if (index > -1) {
      this.products.splice(index, 1);
    }
  }


}
