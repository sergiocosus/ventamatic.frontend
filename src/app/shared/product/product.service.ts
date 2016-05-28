import { Injectable } from '@angular/core';
import {ApiHttp} from "../api-http";
import {Product} from "./product";

@Injectable()
export class ProductService {
  private basePath= 'product/';

  constructor(private apiHttp:ApiHttp) {}

  getAll(params?:any){
    return this.apiHttp.get(this.basePath, params)
      .map(this.mapProducts)
      .map(this.parseProducts);
  }

  get(product_id: number){
    return this.apiHttp.get(this.basePath + product_id)
      .map(this.mapProduct)
      .map(this.parseProduct);
  }

  search(words: string){
    return this.apiHttp.get(this.basePath + 'search',{search:words})
      .map(this.mapProducts)
      .map(this.parseProducts);
  }

  post(product:Product) {
    return this.apiHttp.post(this.basePath,product)
      .map(this.mapProduct)
      .map(this.parseProduct);
  }

  delete(product_id:number){
    return this.apiHttp.delete(this.basePath + product_id);
  }

  put(product:Product){
    return this.apiHttp.put(this.basePath + product.id, product)
      .map(this.mapProduct)
      .map(this.parseProduct);
  }

  private mapProducts(json:any){
    return json.products;
  }

  private mapProduct(json:any){
    return json.product;
  }

  private parseProduct(product:any){
    return new Product().parse(product);
  }

  private parseProducts(products:any){
    return Product.parseArray(products);
  }
}
