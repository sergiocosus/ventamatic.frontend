import { Injectable } from '@angular/core';
import {ApiHttp} from "../../api-http";
import {Brand} from "./brand";
import {BasicEntityService} from "../../../components/basic-entity-modal/basic-entity-service";

@Injectable()
export class BrandService implements BasicEntityService{
  private basePath = 'product/brand/';

  constructor(private apiHttp:ApiHttp) {}

  getAll(params?: any){
    return this.apiHttp.get(this.basePath, params)
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

  restore(brandh_id: number) {
    return this.apiHttp.patch(this.basePath + brandh_id + '/restore', {})
      .map(data => new Brand().parse(data.brand));
  }

  put(brand:Brand){
    return this.apiHttp.put(this.basePath + brand.id, brand)
      .map(this.mapBrand)
      .map(this.parseBrand);
  }

  private mapBrands(json:any){
    return json.brands;
  }

  private mapBrand(json:any){
    return json.brand;
  }

  private parseBrand(brand:any){
    return new Brand().parse(brand);
  }

  private parseBrands(brand:any){
    return Brand.parseArray(brand);
  }
}
