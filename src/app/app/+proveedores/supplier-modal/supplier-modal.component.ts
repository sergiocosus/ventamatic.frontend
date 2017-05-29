import { Component } from '@angular/core';
import {Supplier} from "../shared/supplier";
import {SupplierService} from "../shared/supplier.service";
import {CrudModalComponent} from "../../../components/crud-modal";
import {SupplierCategoryService} from "../category/supplier-category.service";
import {SupplierCategory} from "../category/supplier-category";
import {BrandService} from "../../../shared/product/brand/brand.service";
import {Brand} from "../../../shared/product/brand/brand";
import {NotifyService} from "../../../services/notify.service";

@Component({
  selector: 'supplier-modal',
  templateUrl: 'supplier-modal.component.html',
  styleUrls: ['supplier-modal.component.scss'],
})
export class SupplierModalComponent extends CrudModalComponent {
  name = 'Proveedor';
  supplier: Supplier;

  supplierCategories:SupplierCategory[] = [];
  supplierCategoryItems:any[] = [];
  selectedSupplierCategoryItem:any;

  brands:Brand[] = [];
  brandItems:any[] = [];
  selectedBrandItems:any[] = [];

  constructor(protected supplierService:SupplierService,
              protected notify:NotifyService,
              protected supplierCategoryService:SupplierCategoryService,
              protected brandService:BrandService) {
    super(notify);
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
          (supplierCategories:SupplierCategory) => {
            return {text:supplierCategories.name, id:supplierCategories.id};
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
          brand => { return {text:brand.name, id:brand.id} }
        )
      },
      error => this.notify.serviceError(error)
    );
  }

  openCreate(){
    this.supplier = new Supplier();
    super.openCreate();
  }

  openUpdate(supplier:Supplier){
    this.supplierService.get(supplier.id).subscribe(
      supplier => {
        this.supplier = supplier;

        this.selectedBrandItems = supplier.brands.map(
          brand => ({ id:brand.id, text:brand.name })
        );

        this.mapBrands(this.selectedBrandItems);

        if(supplier.supplier_category) {
          this.selectedSupplierCategoryItem = [{
            text:supplier.supplier_category.name,
            id:supplier.supplier_category.id
          }];
        }
      },
      error => {
        this.notify.serviceError(error)
        this.delayClose();
      }
    );
    super.openUpdate();
  }

  openDelete(supplier:Supplier){
    this.supplier = supplier;
    super.openDelete(supplier)
  }

  create(){
    this.supplierService.post(this.supplier).subscribe(
      supplier => this.createdSuccess(supplier),
      error => this.notify.serviceError(error)
    );
  }

  update(){
    this.supplierService.put(this.supplier).subscribe(
      supplier => this.updatedSuccess(supplier),
      error => this.notify.serviceError(error)
    );
  }

  delete(){
    this.supplierService.delete(this.supplier.id).subscribe(
      response => this.deletedSuccess(this.supplier),
      error => this.notify.serviceError(error)
    );
  }

  closed(){
    this.supplier = null;
    this.selectedSupplierCategoryItem = null;
  }


  mapBrands(items){
    this.supplier.brands = items.map( item => item.id );
  }
}