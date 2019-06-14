import { Component, Inject, OnInit } from '@angular/core';
import { Product } from '@app/api/models/product';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Category } from '@app/api/models/category';
import { Brand } from '@app/api/models/brand';
import { ProductService } from '@app/api/services/product.service';
import { NotifyService } from '@app/shared/services/notify.service';
import { CategoryService } from '@app/api/services/category.service';
import { BrandService } from '@app/api/services/brand.service';
import { Unit } from '@app/api/models/unit.model';
import { units } from '@app/api/classes/units.data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { extract } from '@app/shared/services/i18n.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
})
export class ProductDialogComponent implements OnInit {
  categories: Category[] = [];
  brands: Brand[] = [];
  units: any[] = [];
  form: FormGroup;
  loading = false;

  constructor(protected productService: ProductService,
              protected notify: NotifyService,
              protected categoryService: CategoryService,
              protected brandService: BrandService,
              protected dialogRef: MatDialogRef<ProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public product: Product,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      description: [null, [Validators.required]],
      haveBarCode: [true, []],
      unit_id: [[], []],
      bar_code: [null, []],
      categories: [null, []],
      brand_id: [null, []],
      global_price: [null, []],
      global_minimum: [[], []],
    });

    this.form.get('haveBarCode').valueChanges.subscribe(haveBarCode => {
      haveBarCode ? this.form.get('bar_code').enable()
        : this.form.get('bar_code').disable();
    });

    if (this.product) {
      this.form.reset(this.product);
      this.form.get('haveBarCode').setValue(this.product.bar_code);
      this.form.get('categories')
        .setValue(_.map(this.product.categories, 'id'));
    }

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

  submit() {
    console.log(this.form);
    if (this.form.invalid) {
      this.notify.alert('forms.error');
      return;
    }

    this.loading = true;
    const data = this.form.getRawValue();
    if (!data.haveBarCode) {
      data.bar_code = null;
    }
    if (this.product) {
      this.productService.put(this.product.id, data)
        .pipe(finalize(() => this.loading = false)).subscribe(
        product => {
          this.notify.success(extract('common.updated'));
          this.dialogRef.close(product);
        },
        error => this.notify.serviceError(error)
      );
    } else {
      this.productService.post(data)
        .pipe(finalize(() => this.loading = false)).subscribe(
        product => {
          this.notify.success(extract('common.created'));
          this.dialogRef.close(product);
        },
        error => this.notify.serviceError(error)
      );
    }
  }
}
