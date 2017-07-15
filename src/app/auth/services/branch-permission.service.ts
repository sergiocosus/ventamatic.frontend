import { Injectable } from '@angular/core';
import {ApiHttp} from '../../shared/services/api-http';
import {BranchPermission} from '../classes/branch-permission';


@Injectable()
export class BranchPermissionService {
  private basePath= 'security/branch/';

  constructor(private apiHttp: ApiHttp) {}

  getAll(params?: any){
    return this.apiHttp.get(this.basePath + 'permission', params)
      .map(json => BranchPermission.parseArray(json.branch_permissions));
  }

}