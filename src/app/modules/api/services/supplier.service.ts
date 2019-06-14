import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Supplier } from '../models/supplier';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private basePath = 'supplier/';

  constructor(private httpClient: HttpClient) {
  }

  getAll(params?: any) {
    return this.httpClient.get(this.basePath, {params})
      .pipe(this.mapSuppliers());
  }

  get(supplier_id: number) {
    return this.httpClient.get(this.basePath + supplier_id)
      .pipe(this.mapSupplier());
  }

  getSearch(search: string) {
    return this.httpClient.get(this.basePath + 'search', {params: {search}})
      .pipe(this.mapSuppliers());
  }

  post(data) {
    return this.httpClient.post(this.basePath, data)
      .pipe(this.mapSupplier());
  }

  delete(supplier_id: number) {
    return this.httpClient.delete(this.basePath + supplier_id);
  }

  restore(supplier_id: number) {
    return this.httpClient.patch(this.basePath + supplier_id + '/restore', {})
      .pipe(this.mapSupplier());
  }

  put(supplier_id: number, data) {
    return this.httpClient.put(this.basePath + supplier_id, data)
      .pipe(this.mapSupplier());
  }

  private mapSupplier() {
    return map(response => new Supplier().parse(response['supplier']));
  }

  private mapSuppliers() {
    return map(response => Supplier.parseArray(response['suppliers']));
  }
}
