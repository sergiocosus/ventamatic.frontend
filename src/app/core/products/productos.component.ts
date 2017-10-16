import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Product} from '../../product/classes/product';
import {ProductService} from '../../product/services/product.service';
import {NotifyService} from '../../shared/services/notify.service';
import {MdDialog, MdPaginator, MdSort} from '@angular/material';
import {ProductDialogComponent} from '../../product/components/product-dialog/product-dialog.component';
import {BasicEntityDialogComponent} from '../../various/components/basic-entity-dialog/basic-entity-dialog.component';
import {ReportDataSource} from '../../report/classes/report-data-source';
import {Observable} from 'rxjs/Observable';
import {Brand} from '../../brand/brand';
import {Category} from '../../category/category';
import {units} from 'app/shared/unit/units.data';
import {CategoryService} from '../../category/category.service';
import {BrandService} from '../../brand/brand.service';


@Component({
  selector: 'app-productos',
  templateUrl: 'productos.component.html',
  styleUrls: ['productos.component.scss']
})
export class ProductosComponent implements OnInit {
  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild(MdSort) sort: MdSort;

  public products: Product[];
  public deletedControl = new FormControl();
  dataSource: ReportDataSource | null;
  dataSourceObservable: Observable<any[]>;

  form: FormGroup;
  brands: Observable<Brand[]>;
  categories: Observable<Category[]>;
  units = [];

  constructor(private productService: ProductService,
              private notify: NotifyService,
              private dialog: MdDialog,
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
          case 'id': return [a.id, b.id, 'number'];
          case 'description': return [a.description, b.description, 'string'];
          case 'bar_code': return [a.bar_code, b.bar_code, 'string'];
          case 'categories': return [a.toStringCategories(), b.toStringCategories(), 'string'];
          case 'brand': return [
            (a.brand ? a.brand.name : ''),
            (b.brand ? b.brand.name : ''),
            'string'
          ];
          case 'global_minimum': return [a.global_minimum, b.global_minimum, 'number'];
          case 'price': return [a.global_price, b.global_price, 'number'];
          case 'unit': return [a.unit.name, b.unit.name, 'number'];
        }
      },
      this.form.valueChanges.map(formData => {
          return {
            formData: formData,
            filter: this.fieldIsOk.bind(this)
          };
        }
      )
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
    Object.keys(units).forEach(key => {
      this.units.push(Object.assign({id: key}, units[key] ));
    });

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
    const dialog = this.dialog.open(ProductDialogComponent);
    dialog.componentInstance.initUpdate(product);
    dialog.componentInstance.updated.subscribe(updatedProduct => {
      for (let i = 0; i < this.products.length; i++) {
        if (updatedProduct.id === this.products[i].id) {
          this.products[i] = updatedProduct;
        }
      }
      this.dataSource.setData(this.products);
    });
  }

  create() {
    const dialog = this.dialog.open(ProductDialogComponent);
    dialog.componentInstance.initCreate();
    dialog.componentInstance.created.subscribe(product => {
      this.products.push(product);
      this.dataSource.setData(this.products);
    });
  }

  delete(product: Product) {
    const dialog = this.dialog.open(ProductDialogComponent);
    dialog.componentInstance.initDelete(product);
    dialog.componentInstance.deleted.subscribe(deletedProduct => {
      const index = this.products.indexOf(deletedProduct);
      if (index > -1) {
        if (this.deletedControl.value) {
          this.products[index].deleted_at = ' ';
        } else {
          this.products.splice(index, 1);
        }
      }

      this.dataSource.setData(this.products);
    });
  }

  openCategoryDialog() {
    const dialog = this.dialog.open(BasicEntityDialogComponent);
    dialog.componentInstance.init('category');
  }

  openBrandDialog() {
    const dialog = this.dialog.open(BasicEntityDialogComponent);
    dialog.componentInstance.init('brand');
  }

  fieldIsOk(object, key, value) {
    switch (key) {
      case 'id': return object.id == value;
      case 'description': return object.description.toLocaleLowerCase().search(value.toLowerCase()) >= 0;
      case 'bar_code': return object.bar_code == value;
      case 'categories': return object.categories.find(category => category.id == value);
      case 'brand': return object.brand_id == value;
      case 'minimum': return object.global_minimum == value;
      case 'price': return object.global_price == value;
      case 'unit': return object.unit_id == value;
    }
    return true;
  }
}
