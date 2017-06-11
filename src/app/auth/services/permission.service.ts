import { Injectable } from '@angular/core';
import {ApiHttp} from '../../shared/services/api-http';
import {Permission} from '../classes/permission';

@Injectable()
export class PermissionService {

  private basePath= 'security/system/';

  constructor(private apiHttp: ApiHttp) {}

  getAll(params?: any) {
    return this.apiHttp.get(this.basePath + 'permission', params)
      .map(json => Permission.parseArray(json.permissions));
  }

}
