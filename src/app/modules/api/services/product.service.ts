import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private basePath = 'product/';

  constructor(private httpClient: HttpClient) {
  }

  getAll(params?: any) {
    return this.httpClient.get(this.basePath, params)
      .pipe(this.mapProducts());
  }

  get(product_id: number) {
    return this.httpClient.get(this.basePath + product_id)
      .pipe(this.mapProducts());
  }

  search(search: string) {
    return this.httpClient.get(this.basePath + 'search', {params: {search}})
      .pipe(this.mapProducts());
  }

  getByBarCode(bar_code: string) {
    return this.httpClient.get(this.basePath + 'bar-code', {params: {bar_code}})
      .pipe(this.mapProducts());
  }

  post(product: Product) {
    return this.httpClient.post(this.basePath, product)
      .pipe(this.mapProduct());
  }

  delete(product_id: number) {
    return this.httpClient.delete(this.basePath + product_id);
  }

  restore(product_id: number) {
    return this.httpClient.patch(this.basePath + product_id + '/restore', {})
      .pipe(this.mapProduct());
  }

  put(product: Product) {
    return this.httpClient.put(this.basePath + product.id, product)
      .pipe(this.mapProduct());
  }

  protected mapProduct() {
    return map(response => new Product().parse(response['product']));
  }

  protected mapProducts() {
    return map(response => Product.parseArray(response['products']));
  }
}
