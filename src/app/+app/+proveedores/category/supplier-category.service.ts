import { Injectable } from '@angular/core';
import {ApiHttp} from "../../../shared/api-http";
import {SupplierCategory} from "./supplier-category";

@Injectable()
export class SupplierCategoryService {

  private basePath= 'supplier/category/';

  constructor(private apiHttp:ApiHttp) {}

  getAll(){
    return this.apiHttp.get(this.basePath)
      .map(json => SupplierCategory.parseArray(json.supplier_categories));
  }

  get(supplier_category_id: number){
    return this.apiHttp.get(this.basePath + supplier_category_id)
      .map(json => new SupplierCategory().parse(json.supplier_category));

  }

  post(supplierCategory:SupplierCategory) {
    return this.apiHttp.post(this.basePath, supplierCategory)
      .map(json => new SupplierCategory().parse(json.supplier_category));
  }

  delete(supplier_category_id:number){
    return this.apiHttp.delete(this.basePath + supplier_category_id);
  }

  put(supplierCategory:SupplierCategory){
    return this.apiHttp.put(this.basePath + supplierCategory.id, supplierCategory)
      .map(json => new SupplierCategory().parse(json.supplier_category));
  }
}
