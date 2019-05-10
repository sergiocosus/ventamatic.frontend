import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { isArray } from 'util';
import { Model } from '@app/api/models/model';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() {
  }

  createHttpParams(pagination?: { page: number, per_page: number },
                   order?: { field: string, direction: string },
                   params?: HttpParams) {
    if (!params) {
      params = new HttpParams();
    }
    if (pagination) {
      params = params.set('page', String(pagination.page))
        .set('per_page', String(pagination.per_page));
      if (order) {
        params = params.set('order_field', order.field)
          .set('order_direction', order.direction);
      }
    }
    return params;
  }

  addFilterParams(filters, params?: HttpParams) {
    if (!params) {
      params = new HttpParams();
    }
    if (filters) {
      for (const filter in filters) {
        if (filters[filter]) {
          if (isArray(filters[filter])) {
            params = params.set(filter, filters[filter].join(','));
          } else if (filters[filter]._isAMomentObject) {
            params = params.set(filter, filters[filter].toJSON());
          } else if (filters[filter] instanceof Model) {
            const underscoreName = filter.split(/(?=[A-Z])/).join('_').toLowerCase();
            params = params.set(underscoreName + '_id', filters[filter].id);
          } else {
            params = params.set(filter, filters[filter]);
          }
        }
      }
    }

    return params;
  }

  createHttpParamsWithFilters(pagination, order, filters) {
    let params = this.createHttpParams(pagination, order);
    params = this.addFilterParams(filters, params);
    return params;
  }

}
