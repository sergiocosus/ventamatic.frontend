import {Component, OnInit, ViewChild} from '@angular/core';
import {CrudModalComponent} from '../../../shared/components/crud-modal/crud-modal.component';
import {Product} from '../../classes/product';
import {MatDialogRef} from '@angular/material';
import {Category} from '../../../category/category';
import {Brand} from '../../../brand/brand';
import {ProductService} from '../../services/product.service';
import {NotifyService} from '../../../shared/services/notify.service';
import {CategoryService} from '../../../category/category.service';
import {BrandService} from '../../../brand/brand.service';
import {Unit} from '../../classes/unit.model';
import {units} from 'app/shared/unit/units.data';

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
  brand_id: any;

  units: any[] = [];
  unit_id: any;

  haveBarCode = true;

  constructor(protected productService: ProductService,
              protected notify: NotifyService,
              protected categoryService: CategoryService,
              protected brandService: BrandService,
              protected dialogRef: MatDialogRef<ProductDialogComponent>) {
    super(notify, dialogRef);

    this.units = Unit.parseFromData(units);
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
        if (!this.product.bar_code) {
          this.haveBarCode = false;
        }
        this.selectedCategories = updatedProduct.categories.map(
          categoryOfProduct => categoryOfProduct.id
        );

        if (updatedProduct.brand_id) {
          this.brand_id = updatedProduct.brand_id;
        }
        this.unit_id = updatedProduct.unit_id;
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
    this.product.categories = this.selectedCategories;

    if (!this.haveBarCode) {
      this.product.bar_code = null;
    }

    this.product.brand_id = this.brand_id;
    this.product.unit_id = this.unit_id;
  }
}
