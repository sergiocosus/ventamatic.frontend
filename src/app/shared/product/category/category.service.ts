import { Injectable } from '@angular/core';
import {ApiHttp} from "../../api-http";
import {Category} from "./category";

@Injectable()
export class CategoryService {
  private basePath= 'inventory/category/';
  
  constructor(private apiHttp:ApiHttp) {}

  getAll(){
    return this.apiHttp.get(this.basePath)
      .map(this.mapCategorys)
      .map(this.parseCategories);
  }

  get(product_id: number){
    return this.apiHttp.get(this.basePath + product_id)
      .map(this.mapCategory)
      .map(this.parseCategory);
  }

  post(product:Category) {
    return this.apiHttp.post(this.basePath,product)
      .map(this.mapCategory)
      .map(this.parseCategory);
  }

  delete(product_id:number){
    return this.apiHttp.delete(this.basePath + product_id);
  }

  put(product:Category){
    return this.apiHttp.put(this.basePath + product.id, product)
      .map(this.mapCategory)
      .map(this.parseCategory);
  }

  private mapCategorys(json:any){
    return json.categories;
  }

  private mapCategory(json:any){
    return json.inventory;
  }

  private parseCategory(product:any){
    return new Category().parse(product);
  }

  private parseCategories(categories:any){
    return Category.parseArray(categories);
  }
}
