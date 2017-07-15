import { Injectable } from '@angular/core';
import {Category} from './category';
import {ApiHttp} from '../shared/services/api-http';
import {BasicEntityService} from '../various/components/basic-entity-dialog/basic-entity-service';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CategoryService implements BasicEntityService {
  private basePath= 'product/category/';

  private categoriesSubject: ReplaySubject<Category[]> = new ReplaySubject(1);
  private categoriesRequest: Observable<Category[]>;

  constructor(private apiHttp: ApiHttp) {}

  getAll(params?: any) {
    return this.apiHttp.get(this.basePath, params)
      .map(this.mapCategorys)
      .map(this.parseCategories);
  }

  getAllCached(params?, refresh = false) {
    if (refresh || !this.categoriesRequest) {
      this.categoriesRequest = this.getAll(params);

      this.categoriesRequest.subscribe(
        result => {
          console.log(result);
          this.categoriesSubject.next(result);
        },
        err => this.categoriesSubject.error(err)
      );
    }

    return this.categoriesSubject.asObservable();
  }

  clearCache() {
    this.categoriesRequest = null;
  }

  get(product_id: number) {
    return this.apiHttp.get(this.basePath + product_id)
      .map(this.mapCategory)
      .map(this.parseCategory);
  }

  post(category: Category) {
    return this.apiHttp.post(this.basePath, category)
      .map(this.mapCategory)
      .map(this.parseCategory);
  }

  delete(category_id: number) {
    return this.apiHttp.delete(this.basePath + category_id);
  }

  restore(category_id: number) {
    return this.apiHttp.patch(this.basePath + category_id + '/restore', {})
      .map(data => new Category().parse(data.category));
  }

  put(product: Category) {
    return this.apiHttp.put(this.basePath + product.id, product)
      .map(this.mapCategory)
      .map(this.parseCategory);
  }

  private mapCategorys(json: any) {
    return json.categories;
  }

  private mapCategory(json: any) {
    return json.category;
  }

  private parseCategory(product: any) {
    return new Category().parse(product);
  }

  private parseCategories(categories: any) {
    return Category.parseArray(categories);
  }
}
