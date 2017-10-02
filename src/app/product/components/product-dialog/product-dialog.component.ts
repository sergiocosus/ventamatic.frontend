import {Component, OnInit, ViewChild} from '@angular/core';
import {CrudModalComponent} from '../../../shared/components/crud-modal/crud-modal.component';
import {Product} from '../../classes/product';
import {MdDialogRef} from '@angular/material';
import {Category} from '../../../category/category';
import {Brand} from '../../../brand/brand';
import {ProductService} from '../../services/product.service';
import {NotifyService} from '../../../shared/services/notify.service';
import {CategoryService} from '../../../category/category.service';
import {BrandService} from '../../../brand/brand.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
})
export class ProductDialogComponent extends CrudModalComponent implements OnInit {
  name = 'Producto';
  product: Product;

  categories: Category[] = [];
  selectedCategories: any[] = [];

  brands: Brand[] = [];
  selectedBrands: any;

  units: any[] = [];
  unit: any;

  haveBarCode = true;

  constructor(protected productService: ProductService,
              protected notify: NotifyService,
              protected categoryService: CategoryService,
              protected brandService: BrandService,
              protected dialogRef: MdDialogRef<ProductDialogComponent>) {
    super(notify, dialogRef);

    this.units = [
      {
        id : 1,
        name : 'Pieza'
      },
      {
        id : 2,
        name : 'Kilogramo'
      },
      {
        id : 3,
        name : 'Litro'
      },
      {
        id : 4,
        name : 'Metro'
      }
    ];
  }

  ngOnInit() {
    this.initCategoriesData();
    this.initBrandsData();
  }

  initCategoriesData() {
    this.categoryService.getAllCached().subscribe(
      categories => this.categories = categories,
      error => this.notify.serviceError(error)
    );
  }

  initBrandsData() {
    this.brandService.getAllCached().subscribe(
      brands => this.brands = brands,
      error => this.notify.serviceError(error)
    );
  }

  initCreate() {
    this.product = new Product();
    super.initCreate();
  }

  initUpdate(product: Product) {
    this.productService.get(product.id).subscribe(
      updatedProduct => {
        this.product = updatedProduct;
        console.log(updatedProduct);
        this.selectedCategories = updatedProduct.categories.map(
          categoryOfProduct => this.categories.find(
            category => category.id === categoryOfProduct.id
          )
        );

        if (updatedProduct.brand) {
          this.selectedBrands = this.brands.find(
            (brand) => updatedProduct.brand.id === brand.id
          );
        }

        this.unit = this.units.find(
          unit => unit.id === updatedProduct.unit.id
        );
      },
      error => {
        this.notify.serviceError(error);
        this.delayClose();
      }
    );

    super.initUpdate();
  }

  initDelete(product: Product) {
    this.product = product;
    super.initDelete(product);
  }


  create() {
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


  delete() {
    this.productService.delete(this.product.id).subscribe(
      response => this.deletedSuccess(this.product),
      error => this.notify.serviceError(error)
    );
  }

  appendData() {
    console.log(this.selectedCategories);
    this.product.categories = this.selectedCategories.map(
      item => item.id
    );

    if (!this.haveBarCode) {
      this.product.bar_code = null;
    }

    this.product.brand_id = this.selectedBrands && this.selectedBrands.id;
    this.product.unit_id = this.unit && this.unit.id;
  }
}
