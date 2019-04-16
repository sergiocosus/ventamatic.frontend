
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {SupplierCategory} from '../classes/supplier-category';
import {ApiHttp} from '../../shared/services/api-http';
import {BasicEntityService} from '../../various/components/basic-entity-dialog/basic-entity-service';
import {ReplaySubject, Observable} from 'rxjs';
import {Category} from '../../category/category';

@Injectable()
export class SupplierCategoryService implements BasicEntityService {

  private basePath= 'supplier/category/';

  private supplierCategorySubject: ReplaySubject<Category[]> = new ReplaySubject(1);
  private supplierCategoriesRequest: Observable<Category[]>;

  constructor(private apiHttp: ApiHttp) {}

  getAll(params?: any) {
    return this.apiHttp.get(this.basePath, params).pipe(
      map(json => SupplierCategory.parseArray(json.supplier_categories)));
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
    return this.apiHttp.get(this.basePath + supplier_category_id).pipe(
      map(json => new SupplierCategory().parse(json.supplier_category)));
  }

  post(supplierCategory: SupplierCategory) {
    return this.apiHttp.post(this.basePath, supplierCategory).pipe(
      map(json => new SupplierCategory().parse(json.supplier_category)));
  }

  delete(supplier_category_id: number) {
    return this.apiHttp.delete(this.basePath + supplier_category_id);
  }

  restore(supplier_category_id: number) {
    return this.apiHttp.patch(this.basePath + supplier_category_id + '/restore', {}).pipe(
      map(data => new SupplierCategory().parse(data.supplier_category)));
  }

  put(supplierCategory: SupplierCategory) {
    return this.apiHttp.put(this.basePath + supplierCategory.id, supplierCategory).pipe(
      map(json => new SupplierCategory().parse(json.supplier_category)));
  }
}
