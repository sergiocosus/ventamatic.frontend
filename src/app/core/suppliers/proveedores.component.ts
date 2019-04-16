
import {map} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {SupplierService} from '../../supplier/services/supplier.service';
import {Supplier} from '../../supplier/classes/supplier';
import {NotifyService} from '../../shared/services/notify.service';
import {MatDialog} from '@angular/material';
import {SupplierDialogComponent} from '../../supplier/components/supplier-dialog/supplier-dialog.component';
import {BasicEntityDialogComponent} from '../../various/components/basic-entity-dialog/basic-entity-dialog.component';
import {SupplierCategoryService} from '../../supplier/services/supplier-category.service';
import {BrandService} from '../../brand/brand.service';
import {Observable} from 'rxjs';
import {SupplierCategory} from '../../supplier/classes/supplier-category';
import {Brand} from '../../brand/brand';
import {ReportDataSource} from '../../report/classes/report-data-source';

@Component({
  selector: 'app-proveedores',
  templateUrl: 'proveedores.component.html',
  styleUrls: ['proveedores.component.scss'],
})
export class ProveedoresComponent implements OnInit {
  suppliers: Supplier[];
  deletedControl = new FormControl();
  categories: Observable<SupplierCategory[]>;
  brands: Observable<Brand[]>;

  form: FormGroup;
  dataSource: ReportDataSource | null;
  dataSourceObservable: Observable<any[]>;

  constructor(private supplierService: SupplierService,
              private notify: NotifyService,
              private dialog: MatDialog,
              private fb: FormBuilder,
              private supplierCategoryService: SupplierCategoryService,
              private brandService: BrandService) {
    this.deletedControl.valueChanges.subscribe(
      showDeleted => this.loadSuppliers()
    );
    this.initForm();
  }

  ngOnInit() {
    this.initDataSource();
    this.loadSuppliers();
    this.initFormData();
  }

  loadSuppliers() {
    const params = {
      deleted: this.deletedControl.value
    };

    this.supplierService.getAll(params).subscribe(
      suppliers => {
        this.suppliers = suppliers;
        this.updateDataSource();
      },
      error => this.notify.serviceError(error)
    );
  }

  create() {
    const dialog = this.dialog.open(SupplierDialogComponent);
    dialog.componentInstance.initCreate();
    dialog.componentInstance.created.subscribe(createdSupplier => {
      this.suppliers.push(createdSupplier);
    });
  }

  update(supplier: Supplier) {
    const dialog = this.dialog.open(SupplierDialogComponent);
    dialog.componentInstance.initUpdate(supplier);
    dialog.componentInstance.updated.subscribe(updatedSupplier => {
      for (let i = 0; i < this.suppliers.length; i++) {
        if (updatedSupplier.id === this.suppliers[i].id) {
          this.suppliers[i] = updatedSupplier;
        }
      }
      this.updateDataSource();
    });
  }

  delete(supplier: Supplier) {
    const dialog = this.dialog.open(SupplierDialogComponent);
    dialog.componentInstance.initDelete(supplier);
    dialog.componentInstance.deleted.subscribe(deletedSupplier => {
      const index = this.suppliers.indexOf(deletedSupplier);
      if (index > -1) {
        if (this.deletedControl.value) {
          this.suppliers[index].deleted_at = ' ';
        } else {
          this.suppliers.splice(index, 1);
        }
      }
      this.updateDataSource();
    });
  }

  restore(supplier: Supplier) {
    this.supplierService.restore(supplier.id).subscribe(
      clientRestored => {
        const index = this.suppliers.indexOf(supplier);
        if (index > -1) {
          this.suppliers[index] = clientRestored;
        }
        this.updateDataSource();
        this.notify.success('Proveedor restaurado');
      },
      error => this.notify.serviceError(error)
    );
  }


  openSupplierCategoryDialog() {
    const dialog = this.dialog.open(BasicEntityDialogComponent);
    dialog.componentInstance.init('supplier-category');
  }

  openBrandDialog() {
    const dialog = this.dialog.open(BasicEntityDialogComponent);
    dialog.componentInstance.init('brand');
  }

  private initFormData() {
    this.categories = this.supplierCategoryService.getAllCached();
    this.brands = this.brandService.getAllCached();
  }

  protected updateDataSource() {
    this.dataSource.setData(this.suppliers);
  }


  protected initDataSource() {
    this.dataSource = new ReportDataSource(
      undefined,
      undefined, undefined,
      this.form.valueChanges.pipe(map(formData => {
          return {
            formData: formData,
            filter: this.fieldIsOk.bind(this)
          };
        }
      ))
    );

    this.dataSourceObservable = this.dataSource.connect();
  }

  protected fieldIsOk(object, key, value) {
    switch (key) {
      case 'id': return object.id == value;
      case 'address': return object.address.toLocaleLowerCase().search(value.toLowerCase()) >= 0;
      case 'name': return object.name.toLocaleLowerCase().search(value.toLowerCase()) >= 0;
      case 'brands': return object.brands.find(brand => brand.id == value);
      case 'supplier_category_id': return object.supplier_category_id == value;
      case 'phone': return object.phone == value;

    }
    return true;
  }

  protected initForm() {
    this.form = this.fb.group({
      'id': [''],
      'name': [''],
      'address': [''],
      'brands': [''],
      'supplier_category_id': [''],
      'phone': [''],
    });
  }
}
