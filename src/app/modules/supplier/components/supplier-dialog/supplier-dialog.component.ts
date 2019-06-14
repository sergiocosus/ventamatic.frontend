import { Component, Inject, OnInit } from '@angular/core';
import { Supplier } from '@app/api/models/supplier';
import { SupplierCategory } from '@app/api/models/supplier-category';
import { SupplierService } from '@app/api/services/supplier.service';
import { NotifyService } from '@app/shared/services/notify.service';
import { SupplierCategoryService } from '@app/api/services/supplier-category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Brand } from '@app/api/models/brand';
import { BrandService } from '@app/api/services/brand.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { extract } from '@app/shared/services/i18n.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-supplier-modal',
  templateUrl: './supplier-dialog.component.html',
  styleUrls: ['./supplier-dialog.component.scss'],
})
export class SupplierDialogComponent implements OnInit {
  supplierCategories: SupplierCategory[] = [];
  brands: Brand[] = [];
  form: FormGroup;
  loading = false;

  constructor(protected supplierService: SupplierService,
              protected notify: NotifyService,
              protected supplierCategoryService: SupplierCategoryService,
              protected brandService: BrandService,
              protected dialogRef: MatDialogRef<SupplierDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public supplier: Supplier,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, []],
      phone: [null, []],
      cellphone: [null, []],
      address: [null, []],
      rfc: [null, []],
      supplier_category_id: [[], []],
      brands: [[], []],
    });

    if (this.supplier) {
      this.form.reset(this.supplier);
      this.form.get('brands')
        .setValue(_.map(this.supplier.brands, 'id'));
    }
  }

  ngOnInit() {
    this.loadSupplierCategories();
    this.loadBrands();
  }

  loadSupplierCategories() {
    this.supplierCategoryService.getAllCached().subscribe(
      supplierCategories => this.supplierCategories = supplierCategories,
      error => this.notify.serviceError(error)
    );
  }

  private loadBrands() {
    this.brandService.getAllCached().subscribe(
      brands => this.brands = brands,
      error => this.notify.serviceError(error)
    );
  }

  submit() {
    if (this.form.invalid) {
      this.notify.alert('forms.error');
      return;
    }

    this.loading = true;
    if (this.supplier) {
      this.supplierService.put(this.supplier.id, this.form.getRawValue())
        .pipe(finalize(() => this.loading = false)).subscribe(
        supplier => {
          this.notify.success(extract('common.updated'));
          this.dialogRef.close(supplier);
        },
        error => this.notify.serviceError(error)
      );
    } else {
      this.supplierService.post(this.form.getRawValue())
        .pipe(finalize(() => this.loading = false)).subscribe(
        supplier => {
          this.notify.success(extract('common.created'));
          this.dialogRef.close(supplier);
        },
        error => this.notify.serviceError(error)
      );
    }
  }
}
