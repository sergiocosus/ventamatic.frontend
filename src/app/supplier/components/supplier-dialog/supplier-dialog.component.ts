import {Component, OnInit} from '@angular/core';
import {CrudModalComponent} from '../../../shared/components/crud-modal/crud-modal.component';
import {Supplier} from '../../classes/supplier';
import {SupplierCategory} from '../../classes/supplier-category';
import {SupplierService} from '../../services/supplier.service';
import {NotifyService} from '../../../shared/services/notify.service';
import {SupplierCategoryService} from '../../services/supplier-category.service';
import {MdDialogRef} from '@angular/material';
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
  supplierCategoryItems: any[] = [];
  selectedSupplierCategoryItem: any;

  brands: Brand[] = [];
  brandItems: any[] = [];
  selectedBrandItems: any[] = [];

  constructor(protected supplierService: SupplierService,
              protected notify: NotifyService,
              protected supplierCategoryService: SupplierCategoryService,
              protected brandService: BrandService,
              protected dialogRef: MdDialogRef<SupplierDialogComponent>) {
    super(notify, dialogRef);
  }

  ngOnInit() {
    this.loadSupplierCategories();
    this.loadBrands();
  }

  loadSupplierCategories() {
    this.supplierCategoryService.getAll().subscribe(
      supplierCategories => {
        this.supplierCategories = supplierCategories;
        this.supplierCategoryItems = this.supplierCategories.map(
          (supplierCategory: SupplierCategory) => {
            return {text: supplierCategory.name, id: supplierCategory.id};
          }
        );
      },
      error => this.notify.serviceError(error)
    );
  }

  private loadBrands() {
    this.brandService.getAll().subscribe(
      brands => {
        this.brands = brands;
        this.brandItems = this.brands.map(
          brand => { return {text: brand.name, id: brand.id}; }
        );
      },
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

        this.selectedBrandItems = obtainedSupplier.brands.map(
          brand => ({ id: brand.id, text: brand.name })
        );

        this.mapBrands(this.selectedBrandItems);

        if (obtainedSupplier.supplier_category) {
          this.selectedSupplierCategoryItem = [{
            text: obtainedSupplier.supplier_category.name,
            id: obtainedSupplier.supplier_category.id
          }];
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
    this.supplierService.post(this.supplier).subscribe(
      supplier => this.createdSuccess(supplier),
      error => this.notify.serviceError(error)
    );
  }

  update() {
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
    this.selectedSupplierCategoryItem = null;
  }


  mapBrands(items) {
    this.supplier.brands = items.map( item => item.id );
  }
}
