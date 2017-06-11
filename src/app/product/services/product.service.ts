import { Injectable } from '@angular/core';
import {Product} from '../classes/product';
import {ApiHttp} from '../../shared/services/api-http';

@Injectable()
export class ProductService {
  private basePath= 'product/';

  constructor(private apiHttp: ApiHttp) {}

  getAll(params?: any) {
    return this.apiHttp.get(this.basePath, params)
      .map(this.mapProducts)
      .map(this.parseProducts);
  }

  get(product_id: number) {
    return this.apiHttp.get(this.basePath + product_id)
      .map(data => new Product().parse(data.product));
  }

  search(search: string) {
    return this.apiHttp.get(this.basePath + 'search', {search: search})
      .map(this.mapProducts)
      .map(this.parseProducts);
  }

  getByBarCode(bar_code: string) {
    return this.apiHttp.get(this.basePath + 'bar-code', {bar_code: bar_code})
      .map(this.mapProduct).map(this.parseProduct)
      ;
  }

  post(product: Product) {
    return this.apiHttp.post(this.basePath, product)
      .map(this.mapProduct)
      .map(this.parseProduct);
  }

  delete(product_id: number) {
    return this.apiHttp.delete(this.basePath + product_id);
  }

  restore(product_id: number) {
    return this.apiHttp.patch(this.basePath + product_id + '/restore', {})
        .map(data => new Product().parse(data.product));
  }

  put(product: Product) {
    return this.apiHttp.put(this.basePath + product.id, product)
      .map(this.mapProduct)
      .map(this.parseProduct);
  }

  private mapProducts(json: any) {
    return json.products;
  }

  private mapProduct(json: any) {
    return json.product;
  }

  private parseProduct(product: any) {
    return new Product().parse(product);
  }

  private parseProducts(products: any) {
    return Product.parseArray(products);
  }
}
