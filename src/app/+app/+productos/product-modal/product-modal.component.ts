import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import {CrudModalComponent} from "../../../components/crud-modal/crud-modal.component";
import {Product} from "../../../shared/product/product";
import {ProductService} from "../../../shared/product/product.service";
import {NotificationsService} from "angular2-notifications/lib/notifications.service";
import {CategoryService} from "../../../shared/product/category/category.service";
import {Category} from "../../../shared/product/category/category";
import {SelectComponent} from "ng2-select";

@Component({
  selector: 'product-modal',
  templateUrl: 'product-modal.component.html',
  styleUrls: ['product-modal.component.scss'],
})
export class ProductModalComponent extends CrudModalComponent {
  @ViewChild(ModalComponent) protected modal:ModalComponent;
  @ViewChild(SelectComponent) protected select:SelectComponent;

  @Output() created;
  @Output() updated;
  @Output() deleted;

  name = 'Producto';

  product: Product;

  categories:Category[] = [];
  categoryItems:any[] = [];
  selectedCategoryItems:any[] = [];


  brands:any[] = [];
  constructor(protected productService:ProductService,
              protected notification:NotificationsService,
              protected categoryService:CategoryService) {
    super(notification);
  }

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      categories => {
        this.categories = categories;
        this.categoryItems = this.categories.map(
          (category:Category) => {
            return {text:category.name, id:category.id};
          }
        )
      }
    );

    this.brands.push({label:'cero', value:1})
    this.brands.push({label:'Dos', value:2  })
  }

  openCreate(){
    this.product = new Product();
    super.openCreate();
  }

  openUpdate(product:Product){
    this.product = product;
    this.selectedCategoryItems = this.product.categories.map(
      category => {
        return {id:category.id, text:category.name};
      }
    );
    console.log(this.selectedCategoryItems);
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
    this.product.categories = this.selectedCategoryItems.map(
      item => item.id
    );
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

  closed(){
    this.product = null;
  }

}
