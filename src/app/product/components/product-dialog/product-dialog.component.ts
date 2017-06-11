import {Component, OnInit, ViewChild} from '@angular/core';
import {CrudModalComponent} from '../../../shared/components/crud-modal/crud-modal.component';
import {SelectComponent} from 'ng2-select';
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
  @ViewChild(SelectComponent) protected select: SelectComponent;

  name = 'Producto';
  product: Product;

  categories: Category[] = [];
  categoryItems: any[] = [];
  selectedCategoryItems: any[] = [];

  brands: Brand[] = [];
  brandItems: any[] = [];
  selectedBrandItem: any;

  unitItems: any[] = [];
  selectedUnitItem: any = [];

  haveBarCode = true;

  constructor(protected productService: ProductService,
              protected notify: NotifyService,
              protected categoryService: CategoryService,
              protected brandService: BrandService,
              protected dialogRef: MdDialogRef<ProductDialogComponent>) {
    super(notify, dialogRef);

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
    this.initBrandsData();
  }

  initCategoriesData() {
    this.categoryService.getAll().subscribe(
      categories => {
        this.categories = categories;
        this.categoryItems = this.categories.map(
          (category: Category) => {
            return {text: category.name, id: category.id};
          }
        );
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
            return {text: brand.name, id: brand.id};
          }
        );
      },
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
        this.selectedCategoryItems = updatedProduct.categories.map(
          category => {
            return {id: category.id, text: category.name};
          }
        );

        if (updatedProduct.brand) {
          this.selectedBrandItem = [{
            text: updatedProduct.brand.name,
            id: updatedProduct.brand.id
          }];
        }

        this.selectedUnitItem = [{
          text: updatedProduct.unit.name,
          id: updatedProduct.unit.id
        }];
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

  closed() {
    this.product = null;
    this.selectedBrandItem = null;
    this.selectedUnitItem = null;
    this.selectedCategoryItems = [];
  }

}
