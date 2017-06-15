import { Injectable } from '@angular/core';
import {Brand} from './brand';
import {ApiHttp} from '../shared/services/api-http';
import {BasicEntityService} from '../various/components/basic-entity-dialog/basic-entity-service';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BrandService implements BasicEntityService {
  private basePath = 'product/brand/';

  private brandsSubject: ReplaySubject<Brand[]> = new ReplaySubject(1);
  private brandsRequest: Observable<Brand[]>;

  constructor(private apiHttp: ApiHttp) {}

  getAll(params?: any) {
    return this.apiHttp.get(this.basePath, params)
      .map(this.mapBrands)
      .map(this.parseBrands);
  }


  getAllCached(params?, refresh = false) {
    if (refresh || !this.brandsRequest) {
      this.brandsRequest = this.getAll(params);

      this.brandsRequest.subscribe(
        result => this.brandsSubject.next(result),
        err => this.brandsSubject.error(err)
      );
    }

    return this.brandsSubject.asObservable();
  }

  get(brand_id: number) {
    return this.apiHttp.get(this.basePath + brand_id)
      .map(this.mapBrand)
      .map(this.parseBrand);
  }

  post(brand: Brand) {
    return this.apiHttp.post(this.basePath, brand)
      .map(this.mapBrand)
      .map(this.parseBrand);
  }

  delete(brand_id: number) {
    return this.apiHttp.delete(this.basePath + brand_id);
  }

  restore(brandh_id: number) {
    return this.apiHttp.patch(this.basePath + brandh_id + '/restore', {})
      .map(data => new Brand().parse(data.brand));
  }

  put(brand: Brand) {
    return this.apiHttp.put(this.basePath + brand.id, brand)
      .map(this.mapBrand)
      .map(this.parseBrand);
  }

  private mapBrands(json: any) {
    return json.brands;
  }

  private mapBrand(json: any) {
    return json.brand;
  }

  private parseBrand(brand: any) {
    return new Brand().parse(brand);
  }

  private parseBrands(brand: any) {
    return Brand.parseArray(brand);
  }
}
