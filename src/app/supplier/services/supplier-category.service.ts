import { Injectable } from '@angular/core';
import {SupplierCategory} from '../classes/supplier-category';
import {ApiHttp} from '../../shared/services/api-http';
import {BasicEntityService} from '../../various/components/basic-entity-dialog/basic-entity-service';

@Injectable()
export class SupplierCategoryService implements BasicEntityService {

  private basePath= 'supplier/category/';

  constructor(private apiHttp: ApiHttp) {}

  getAll(params?: any) {
    return this.apiHttp.get(this.basePath, params)
      .map(json => SupplierCategory.parseArray(json.supplier_categories));
  }

  get(supplier_category_id: number) {
    return this.apiHttp.get(this.basePath + supplier_category_id)
      .map(json => new SupplierCategory().parse(json.supplier_category));

  }

  post(supplierCategory: SupplierCategory) {
    return this.apiHttp.post(this.basePath, supplierCategory)
      .map(json => new SupplierCategory().parse(json.supplier_category));
  }

  delete(supplier_category_id: number) {
    return this.apiHttp.delete(this.basePath + supplier_category_id);
  }

  restore(supplier_category_id: number) {
    return this.apiHttp.patch(this.basePath + supplier_category_id + '/restore', {})
      .map(data => new SupplierCategory().parse(data.supplier_category));
  }

  put(supplierCategory: SupplierCategory) {
    return this.apiHttp.put(this.basePath + supplierCategory.id, supplierCategory)
      .map(json => new SupplierCategory().parse(json.supplier_category));
  }
}
