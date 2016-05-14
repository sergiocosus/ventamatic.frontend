import { Injectable } from '@angular/core';
import {ApiHttp} from "../../api-http";
import {Brand} from "./brand";

@Injectable()
export class BrandService {
  private basePath= 'product/brand/';

  constructor(private apiHttp:ApiHttp) {}

  getAll(){
    return this.apiHttp.get(this.basePath)
      .map(this.mapBrands)
      .map(this.parseBrands);
  }

  get(brand_id: number){
    return this.apiHttp.get(this.basePath + brand_id)
      .map(this.mapBrand)
      .map(this.parseBrand);
  }

  post(brand:Brand) {
    return this.apiHttp.post(this.basePath,brand)
      .map(this.mapBrand)
      .map(this.parseBrand);
  }

  delete(brand_id:number){
    return this.apiHttp.delete(this.basePath + brand_id);
  }

  put(brand:Brand){
    return this.apiHttp.put(this.basePath + brand.id, brand)
      .map(this.mapBrand)
      .map(this.parseBrand);
  }

  private mapBrands(json:any){
    return json.categories;
  }

  private mapBrand(json:any){
    return json.category;
  }

  private parseBrand(product:any){
    return new Brand().parse(product);
  }

  private parseBrands(products:any){
    return Brand.parseArray(products);
  }
}
