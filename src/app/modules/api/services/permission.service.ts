import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Permission } from '../models/permission';
import { CacheableRequest } from '../classes/cacheable-request';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private basePath = 'security/system/';

  private allCache = new CacheableRequest<Permission[]>();

  constructor(private httpClient: HttpClient) {
  }

  getAll(params?: any) {
    return this.httpClient.get(this.basePath + 'permission', params).pipe(
      map(json => Permission.parseArray(json['permissions'])));
  }

  getAllCached(params?, refresh = false) {
    return this.allCache.getCache(this.getAll(params), refresh);
  }

}
