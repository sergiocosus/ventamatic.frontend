import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Category } from '@app/api/models/category';
import { BasicEntityService } from '@app/various/components/basic-entity-dialog/basic-entity-service';
import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements BasicEntityService {
  private basePath = 'product/category/';

  private categoriesSubject: ReplaySubject<Category[]> = new ReplaySubject(1);
  private categoriesRequest: Observable<Category[]>;

  constructor(private apiHttp: HttpClient) {
  }

  getAll(params?: any) {
    return this.apiHttp.get(this.basePath, params)
      .pipe(this.mapCategories());
  }

  getAllCached(params?, refresh = false) {
    if (refresh || !this.categoriesRequest) {
      this.categoriesRequest = this.getAll(params);

      this.categoriesRequest.subscribe(
        result => {
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

  get(category_id: number) {
    return this.apiHttp.get(this.basePath + category_id)
      .pipe(this.mapCategory());
  }

  post(category: Category) {
    return this.apiHttp.post(this.basePath, category)
      .pipe(this.mapCategory());
  }

  delete(category_id: number) {
    return this.apiHttp.delete(this.basePath + category_id);
  }

  restore(category_id: number) {
    return this.apiHttp.patch(this.basePath + category_id + '/restore', {})
      .pipe(this.mapCategory());
  }

  put(category: Category) {
    return this.apiHttp.put(this.basePath + category.id, category)
      .pipe(this.mapCategory());
  }

  protected mapCategory() {
    return map(response => new Category().parse(response['category']));
  }

  protected mapCategories() {
    return map(response => Category.parseArray(response['categories']));
  }
}
