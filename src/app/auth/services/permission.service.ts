import { Injectable } from '@angular/core';
import {ApiHttp} from '../../shared/services/api-http';
import {Permission} from '../classes/permission';
import {CacheableRequest} from '../../shared/classes/cacheable-request';

@Injectable()
export class PermissionService {

  private basePath= 'security/system/';

  private allCache = new CacheableRequest<Permission[]>();

  constructor(private apiHttp: ApiHttp) {}

  getAll(params?: any) {
    return this.apiHttp.get(this.basePath + 'permission', params)
      .map(json => Permission.parseArray(json.permissions));
  }

  getAllCached(params?, refresh = false) {
    return this.allCache.getCache(this.getAll(params), refresh);
  }

}
