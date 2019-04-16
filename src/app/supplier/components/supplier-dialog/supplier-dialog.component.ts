import {Component, OnInit} from '@angular/core';
import {CrudModalComponent} from '../../../shared/components/crud-modal/crud-modal.component';
import {Supplier} from '../../classes/supplier';
import {SupplierCategory} from '../../classes/supplier-category';
import {SupplierService} from '../../services/supplier.service';
import {NotifyService} from '../../../shared/services/notify.service';
import {SupplierCategoryService} from '../../services/supplier-category.service';
import {MatDialogRef} from '@angular/material';
import {Brand} from '../../../brand/brand';
import {BrandService} from '../../../brand/brand.service';


@Component({
  selector: 'app-supplier-modal',
  templateUrl: './supplier-dialog.component.html',
  styleUrls: ['./supplier-dialog.component.scss'],
})
export class SupplierDialogComponent extends CrudModalComponent implements OnInit {
  name = 'Proveedor';
  supplier: Supplier;

  supplierCategories: SupplierCategory[] = [];
  selectedSupplierCategory: any;

  brands: Brand[] = [];
  selectedBrands: Brand[] = [];

  constructor(protected supplierService: SupplierService,
              protected notify: NotifyService,
              protected supplierCategoryService: SupplierCategoryService,
              protected brandService: BrandService,
              protected dialogRef: MatDialogRef<SupplierDialogComponent>) {
    super(notify, dialogRef);
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

  initCreate() {
    this.supplier = new Supplier();
    super.initCreate();
  }

  initUpdate(supplier: Supplier) {
    this.supplierService.get(supplier.id).subscribe(
      obtainedSupplier => {
        this.supplier = obtainedSupplier;

        this.selectedBrands = obtainedSupplier.brands.map(
          brandsOfSuppliers => this.brands.find(
            brand => brand.id === brandsOfSuppliers.id
          )
        );

        if (obtainedSupplier.supplier_category) {
          this.selectedSupplierCategory = this.supplierCategories.find(
            (supplierCategory) => obtainedSupplier.supplier_category.id === supplierCategory.id
          );
        }
      },
      error => {
        this.notify.serviceError(error);
        this.delayClose();
      }
    );
    super.initUpdate();
  }

  initDelete(supplier: Supplier) {
    this.supplier = supplier;
    super.initDelete(supplier);
  }

  create() {
    this.appendData();

    this.supplierService.post(this.supplier).subscribe(
      supplier => this.createdSuccess(supplier),
      error => this.notify.serviceError(error)
    );
  }

  update() {
    this.appendData();

    this.supplierService.put(this.supplier).subscribe(
      supplier => this.updatedSuccess(supplier),
      error => this.notify.serviceError(error)
    );
  }

  delete() {
    this.supplierService.delete(this.supplier.id).subscribe(
      response => this.deletedSuccess(this.supplier),
      error => this.notify.serviceError(error)
    );
  }

  closed() {
    this.supplier = null;
    this.selectedSupplierCategory = null;
  }

  appendData() {
    this.supplier.brands = this.selectedBrands.map(
      item => item.id
    ) as any[];

    this.supplier.supplier_category_id = this.selectedSupplierCategory && this.selectedSupplierCategory.id;
  }
}
