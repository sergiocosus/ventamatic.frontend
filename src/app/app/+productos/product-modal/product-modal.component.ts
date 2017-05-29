import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { ModalComponent } from "ng2-bs4-modal/ng2-bs4-modal";
import {CrudModalComponent} from "../../../components/crud-modal/crud-modal.component";
import {Product} from "../../../shared/product/product";
import {ProductService} from "../../../shared/product/product.service";
import {CategoryService} from "../../../shared/product/category/category.service";
import {Category} from "../../../shared/product/category/category";
import {SelectComponent} from "ng2-select";
import {BrandService} from "../../../shared/product/brand/brand.service";
import {Brand} from "../../../shared/product/brand/brand";
import {NotifyService} from "../../../services/notify.service";

@Component({
  selector: 'product-modal',
  templateUrl: 'product-modal.component.html',
  styleUrls: ['product-modal.component.scss'],
})
export class ProductModalComponent extends CrudModalComponent {
  @ViewChild(SelectComponent) protected select:SelectComponent;

  name = 'Producto';

  product: Product;

  categories:Category[] = [];
  categoryItems:any[] = [];
  selectedCategoryItems:any[] = [];

  brands:Brand[] = [];
  brandItems:any[] = [];
  selectedBrandItem:any;

  unitItems:any[] = [];
  selectedUnitItem:any = [];

  haveBarCode = true;

  constructor(protected productService:ProductService,
              protected notify:NotifyService,
              protected categoryService:CategoryService,
              protected brandService:BrandService) {
    super(notify);

    this.unitItems = [
      {
        'id' : 1,
        'text' : 'Pieza'
      },
      {
        'id' : 2,
        'text' : 'Kilogramo'
      },
      {
        'id' : 3,
        'text' : 'Litro'
      },
      {
        'id' : 4,
        'text' : 'Metro'
      }
    ];
  }

  ngOnInit() {
    this.initCategoriesData();
    this.initBrandsData()
  }

  initCategoriesData() {
    this.categoryService.getAll().subscribe(
      categories => {
        this.categories = categories;
        this.categoryItems = this.categories.map(
          (category:Category) => {
            return {text:category.name, id:category.id};
          }
        )
      },
      error => this.notify.serviceError(error)
    );
  }

  initBrandsData() {
    this.brandService.getAll().subscribe(
      brands => {
        this.brands = brands;
        this.brandItems = this.brands.map(
          brand => {
            return {text:brand.name, id:brand.id};
          }
        )
      },
      error => this.notify.serviceError(error)
    );
  }

  openCreate(){
    this.product = new Product();
    super.openCreate();
  }

  openUpdate(product:Product){
    this.productService.get(product.id).subscribe(
      product => {
        console.log(product);
        this.product = product;
        this.selectedCategoryItems = product.categories.map(
          category => {
            return {id:category.id, text:category.name};
          }
        );

        if(product.brand) {
          this.selectedBrandItem = [{
            text:product.brand.name,
            id:product.brand.id
          }];
        }

        this.selectedUnitItem = [{
          text:product.unit.name,
          id:product.unit.id
        }];
      },
      error => {
        this.notify.serviceError(error);
        this.delayClose();
      }
    );

    super.openUpdate();
  }

  openDelete(product:Product){
    this.product = product;
    super.openDelete(product)
  }


  create(){
    this.appendData();

    this.productService.post(this.product).subscribe(
      product => this.createdSuccess(product),
      error => this.notify.serviceError(error)
    );
  }

  update() {
    this.appendData();

    this.productService.put(this.product).subscribe(
      product => this.updatedSuccess(product),
      error => this.notify.serviceError(error)
    );
  }


  delete(){
    this.productService.delete(this.product.id).subscribe(
      response => this.deletedSuccess(this.product),
      error => this.notify.serviceError(error)
    );
  }

  appendData() {
    this.product.categories = this.selectedCategoryItems.map(
      item => item.id
    );

    if (!this.haveBarCode) {
      this.product.bar_code = null;
    }

    this.product.brand_id = this.selectedBrandItem ?
      this.selectedBrandItem[0].id : null;
    this.product.unit_id = this.selectedUnitItem ?
      this.selectedUnitItem[0].id : null;
  }

  closed(){
    this.product = null;
    this.selectedBrandItem = null;
    this.selectedUnitItem = null;
    this.selectedCategoryItems = [];
  }

}
