import { Injectable } from '@angular/core';
import {ApiHttp} from '../../shared/services/api-http';
import {BranchPermission} from '../classes/branch-permission';
import {CacheableRequest} from '../../shared/classes/cacheable-request';


@Injectable()
export class BranchPermissionService {
  private basePath= 'security/branch/';

  private allCached = new CacheableRequest<BranchPermission[]>();

  constructor(private apiHttp: ApiHttp) {}

  getAll(params?: any){
    return this.apiHttp.get(this.basePath + 'permission', params)
      .map(json => BranchPermission.parseArray(json.branch_permissions));
  }

  getAllCached(params?, refresh = false) {
    return this.allCached.getCache(this.getAll(params), refresh);
  }

}
