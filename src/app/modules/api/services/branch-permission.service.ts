import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BranchPermission } from '../models/branch-permission';
import { CacheableRequest } from '../classes/cacheable-request';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BranchPermissionService {
  private basePath = 'security/branch/';

  private allCached = new CacheableRequest<BranchPermission[]>();

  constructor(private apiHttp: HttpClient) {
  }

  getAll(params?: any) {
    return this.apiHttp.get(this.basePath + 'permission', params).pipe(
      map(json => BranchPermission.parseArray(json['branch_permissions'])));
  }

  getAllCached(params?, refresh = false) {
    return this.allCached.getCache(this.getAll(params), refresh);
  }

}
