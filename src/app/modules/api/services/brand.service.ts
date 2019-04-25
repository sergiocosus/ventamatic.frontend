import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Brand } from '@app/api/models/brand';
import { BasicEntityService } from '@app/various/components/basic-entity-dialog/basic-entity-service';
import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrandService implements BasicEntityService {
  private basePath = 'product/brand/';

  private brandsSubject: ReplaySubject<Brand[]> = new ReplaySubject(1);
  private brandsRequest: Observable<Brand[]>;

  constructor(private httpClient: HttpClient) {
  }

  getAll(params?: any) {
    return this.httpClient.get(this.basePath, params)
      .pipe(this.mapBrands());
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

  clearCache() {
    this.brandsRequest = null;
  }

  get(brand_id: number) {
    return this.httpClient.get(this.basePath + brand_id)
      .pipe(this.mapBrand());
  }

  post(brand: Brand) {
    return this.httpClient.post(this.basePath, brand)
      .pipe(this.mapBrand());
  }

  delete(brand_id: number) {
    return this.httpClient.delete(this.basePath + brand_id);
  }

  restore(brandh_id: number) {
    return this.httpClient.patch(this.basePath + brandh_id + '/restore', {})
      .pipe(this.mapBrand());
  }

  put(brand: Brand) {
    return this.httpClient.put(this.basePath + brand.id, brand)
      .pipe(this.mapBrand());
  }

  protected mapBrand() {
    return map(response => new Brand().parse(response['brand']));
  }

  protected mapBrands() {
    return map(response => Brand.parseArray(response['brands']));
  }
}
