import { filter, map, mergeMap } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Product } from '@app/api/models/product';
import { ProductService } from '@app/api/services/product.service';
import { NotifyService } from '@app/shared/services/notify.service';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { ProductDialogComponent } from '@app/product/components/product-dialog/product-dialog.component';
import { BasicEntityDialogComponent } from '@app/various/components/basic-entity-dialog/basic-entity-dialog.component';
import { ReportDataSource } from '@app/report/classes/report-data-source';
import { Observable } from 'rxjs';
import { Brand } from '@app/api/models/brand';
import { Category } from '@app/api/models/category';
import { CategoryService } from '@app/api/services/category.service';
import { BrandService } from '@app/api/services/brand.service';
import { units } from '@app/api/classes/units.data';
import { Unit } from '@app/api/models/unit.model';
import { ConfirmDialogComponent, ConfirmDialogData } from '@app/shared/components/confirm-dialog/confirm-dialog.component';
import { extract } from '@app/shared/services/i18n.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-productos',
  templateUrl: 'productos.component.html',
  styleUrls: ['productos.component.scss']
})
export class ProductosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public products: Product[];
  public deletedControl = new FormControl();
  dataSource: ReportDataSource | null;
  dataSourceObservable: Observable<any[]>;

  form: FormGroup;
  brands: Observable<Brand[]>;
  categories: Observable<Category[]>;
  units = [];
  displayedColumns = [
    'id',
    'description',
    'bar_code',
    'categories',
    'brand',
    'global_minimum',
    'price',
    'unit',
    'actions',
  ];

  constructor(private productService: ProductService,
              private notify: NotifyService,
              private dialog: MatDialog,
              private fb: FormBuilder,
              private categoryService: CategoryService,
              private brandService: BrandService) {
    this.deletedControl.valueChanges.subscribe(
      showDeleted => this.loadProducts()
    );

    this.initForm();
  }

  ngOnInit() {
    this.dataSource = new ReportDataSource(
      this.paginator,
      this.sort,
      (a, b) => {
        switch (this.sort.active) {
          case 'id':
            return [a.id, b.id, 'number'];
          case 'description':
            return [a.description, b.description, 'string'];
          case 'bar_code':
            return [a.bar_code, b.bar_code, 'string'];
          case 'categories':
            return [a.toStringCategories(), b.toStringCategories(), 'string'];
          case 'brand':
            return [
              (a.brand ? a.brand.name : ''),
              (b.brand ? b.brand.name : ''),
              'string'
            ];
          case 'global_minimum':
            return [a.global_minimum, b.global_minimum, 'number'];
          case 'price':
            return [a.global_price, b.global_price, 'number'];
          case 'unit':
            return [a.unit.name, b.unit.name, 'number'];
        }
      },
      this.form.valueChanges.pipe(map(formData => {
          return {
            formData: formData,
            filter: this.fieldIsOk.bind(this)
          };
        }
      ))
    );

    this.dataSourceObservable = this.dataSource.connect();
    this.loadProducts();
    this.initFormData();
  }

  initForm() {
    this.form = this.fb.group({
      'id': [''],
      'description': [''],
      'bar_code': [''],
      'categories': [''],
      'brand': [''],
      'minimum': [''],
      'price': [''],
      'unit': [''],
    });
  }

  initFormData() {
    this.categories = this.categoryService.getAllCached();
    this.brands = this.brandService.getAllCached();
    this.units = Unit.parseFromData(units);
  }


  loadProducts() {
    this.products = [];
    const params = {
      deleted: this.deletedControl.value
    };

    this.productService.getAll(params).subscribe(
      products => {
        this.products = products;
        this.dataSource.setData(products);
      },
      error => this.notify.serviceError(error)
    );
  }

  clickUpdate(product: Product) {
    this.update(product);
  }

  clickDelete($event, product: Product) {
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

  clickCreate() {
    this.create();
  }

  update(product: Product) {
    this.dialog.open(ProductDialogComponent, {data: product})
      .afterClosed().pipe(filter(Boolean))
      .subscribe(updatedProduct => {
        product.replaceProperties(updatedProduct);
        this.dataSource.updateData(this.products);
      });
  }

  create() {
    this.dialog.open(ProductDialogComponent).afterClosed()
      .pipe(filter(Boolean)).subscribe(product => {
      this.products.unshift(product);
      this.dataSource.updateData(this.products);
    });
  }

  delete(product: Product) {
    this.dialog.open<ConfirmDialogComponent, ConfirmDialogData>(ConfirmDialogComponent, {
      data: {
        title: product.description,
        message: extract('common.deleteConfirm'),
      }
    }).afterClosed().pipe(
      filter(Boolean),
      mergeMap(() => this.productService.delete(product.id))
    ).subscribe(() => {
        if (this.deletedControl.value) {
          product.deleted_at = ' ';
        } else {
          _.remove(this.products, product);
          this.dataSource.setData(this.products);
        }
      },
      error => this.notify.serviceError(error)
    );
  }

  openCategoryDialog() {
    const dialog = this.dialog.open(BasicEntityDialogComponent);
    dialog.componentInstance.init('category');
  }

  openBrandDialog() {
    const dialog = this.dialog.open(BasicEntityDialogComponent);
    dialog.componentInstance.init('brand');
  }

  private fieldIsOk(object, key, value) {
    switch (key) {
      case 'id':
        return +object.id === +value;
      case 'description':
        return object.description.toLocaleLowerCase().search(value.toLowerCase()) >= 0;
      case 'bar_code':
        return object.bar_code === value;
      case 'categories':
        return object.categories.find(category => category.id === value);
      case 'brand':
        return object.brand_id === value;
      case 'minimum':
        return object.global_minimum === value;
      case 'price':
        return object.global_price === value;
      case 'unit':
        return object.unit_id === value;
    }
    return true;
  }
}
