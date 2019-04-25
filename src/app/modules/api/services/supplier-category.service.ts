import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { SupplierCategory } from '../models/supplier-category';
import { BasicEntityService } from '@app/various/components/basic-entity-dialog/basic-entity-service';
import { Observable, ReplaySubject } from 'rxjs';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupplierCategoryService implements BasicEntityService {

  private basePath = 'supplier/category/';

  private supplierCategorySubject: ReplaySubject<Category[]> = new ReplaySubject(1);
  private supplierCategoriesRequest: Observable<Category[]>;

  constructor(private httpClient: HttpClient) {
  }

  getAll(params?: any) {
    return this.httpClient.get(this.basePath, params)
      .pipe(this.mapSupplierCategories());
  }

  getAllCached(params?, refresh = false) {
    if (refresh || !this.supplierCategoriesRequest) {
      this.supplierCategoriesRequest = this.getAll(params);

      this.supplierCategoriesRequest.subscribe(
        result => {
          this.supplierCategorySubject.next(result);
        },
        err => this.supplierCategorySubject.error(err)
      );
    }

    return this.supplierCategorySubject.asObservable();
  }

  clearCache() {
    this.supplierCategoriesRequest = null;
  }

  get(supplier_category_id: number) {
    return this.httpClient.get(this.basePath + supplier_category_id)
      .pipe(this.mapSupplierCategory());
  }

  post(supplierCategory: SupplierCategory) {
    return this.httpClient.post(this.basePath, supplierCategory)
      .pipe(this.mapSupplierCategory());
  }

  delete(supplier_category_id: number) {
    return this.httpClient.delete(this.basePath + supplier_category_id);
  }

  restore(supplier_category_id: number) {
    return this.httpClient.patch(this.basePath + supplier_category_id + '/restore', {})
      .pipe(this.mapSupplierCategory());
  }

  put(supplierCategory: SupplierCategory) {
    return this.httpClient.put(this.basePath + supplierCategory.id, supplierCategory)
      .pipe(this.mapSupplierCategory());
  }

  private mapSupplierCategory() {
    return map(response => new SupplierCategory().parse(response['supplier_category']));
  }

  private mapSupplierCategories() {
    return map(response => SupplierCategory.parseArray(response['supplier_categories']));
  }
}
