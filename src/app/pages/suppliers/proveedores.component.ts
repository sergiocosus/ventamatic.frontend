import { filter, map, mergeMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SupplierService } from '@app/api/services/supplier.service';
import { Supplier } from '@app/api/models/supplier';
import { NotifyService } from '@app/shared/services/notify.service';
import { MatDialog } from '@angular/material';
import { SupplierDialogComponent } from '@app/supplier/components/supplier-dialog/supplier-dialog.component';
import { BasicEntityDialogComponent } from '@app/various/components/basic-entity-dialog/basic-entity-dialog.component';
import { SupplierCategoryService } from '@app/api/services/supplier-category.service';
import { BrandService } from '@app/api/services/brand.service';
import { Observable } from 'rxjs';
import { SupplierCategory } from '@app/api/models/supplier-category';
import { Brand } from '@app/api/models/brand';
import { ReportDataSource } from '@app/report/classes/report-data-source';
import { ConfirmDialogComponent, ConfirmDialogData } from '@app/shared/components/confirm-dialog/confirm-dialog.component';
import { extract } from '@app/shared/services/i18n.service';
import * as _ from 'lodash';

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
    this.dialog.open<SupplierDialogComponent, null, Supplier>(SupplierDialogComponent)
      .afterClosed().pipe(filter(a => !!a))
      .subscribe(supplier => this.suppliers.push(supplier));
  }

  update(supplier: Supplier) {
    this.dialog.open<SupplierDialogComponent, Supplier, Supplier>(SupplierDialogComponent, {data: supplier})
      .afterClosed().pipe(filter(a => !!a)).subscribe(updatedSupplier => {
        supplier.replaceProperties(updatedSupplier);
        this.updateDataSource();
      }
    );
  }

  delete(supplier: Supplier) {
    this.dialog.open<ConfirmDialogComponent, ConfirmDialogData>(ConfirmDialogComponent, {
      data: {
        title: supplier.name,
        message: extract('common.deleteConfirm'),
      }
    }).afterClosed().pipe(
      filter(Boolean),
      mergeMap(() => this.supplierService.delete(supplier.id))
    ).subscribe(() => {
        if (this.deletedControl.value) {
          supplier.deleted_at = ' ';
        } else {
          _.remove(this.suppliers, supplier);
          this.dataSource.setData(this.suppliers);
        }
      },
      error => this.notify.serviceError(error)
    );
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
      case 'id':
        return object.id == value;
      case 'address':
        return object.address.toLocaleLowerCase().search(value.toLowerCase()) >= 0;
      case 'name':
        return object.name.toLocaleLowerCase().search(value.toLowerCase()) >= 0;
      case 'brands':
        return object.brands.find(brand => brand.id === value);
      case 'supplier_category_id':
        return object.supplier_category_id === value;
      case 'phone':
        return object.phone === value;

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
