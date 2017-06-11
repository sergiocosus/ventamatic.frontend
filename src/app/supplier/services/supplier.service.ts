import { Injectable } from '@angular/core';
import {Supplier} from '../classes/supplier';
import {ApiHttp} from '../../shared/services/api-http';

@Injectable()
export class SupplierService {
  private basePath = 'supplier/';

  constructor(private apiHttp: ApiHttp) {}

  getAll(params?: any) {
    return this.apiHttp.get(this.basePath, params)
      .map(res => {console.log(res); return <Supplier[]>res.suppliers; });
  }

  get(supplier_id: number) {
    return this.apiHttp.get(this.basePath + supplier_id)
      .map(res => {return <Supplier>res.supplier; });
  }

  getSearch(search: string) {
    return this.apiHttp.get(this.basePath + 'search', {search: search})
      .map(res => Supplier.parseArray(res.suppliers));
  }

  post(supplier: Supplier) {
    return this.apiHttp.post(this.basePath, supplier)
      .map(res => {return <Supplier>res.supplier; });
  }

  delete(supplier_id: number) {
    return this.apiHttp.delete(this.basePath + supplier_id);
  }

  restore(supplier_id: number) {
    return this.apiHttp.patch(this.basePath + supplier_id + '/restore', {})
      .map(data => new Supplier().parse(data.supplier));
  }

  put(supplier: Supplier) {
    return this.apiHttp.put(this.basePath + supplier.id, supplier)
      .map(res => {return <Supplier>res.supplier; });
  }
}
