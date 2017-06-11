import { Injectable } from '@angular/core';
import {ApiHttp} from '../../shared/services/api-http';
import {Role} from '../classes/role';

@Injectable()
export class RoleService {
  private basePath = 'security/system/role/';

  constructor(private apiHttp: ApiHttp) {}

  getAll() {
    return this.apiHttp.get(this.basePath)
      .map(json => Role.parseArray(json.roles));
  }

  get(role_id) {
    return this.apiHttp.get(this.basePath + role_id)
      .map(json => new Role().parse(json.role));
  }

  post(role: Role) {
    return this.apiHttp.post(this.basePath, role)
      .map(json => new Role().parse(json.role));
  }

  put(role: Role) {
    return this.apiHttp.put(this.basePath + role.id, role)
      .map(json => new Role().parse(json.role));
  }

  delete(role_id: number) {
    return this.apiHttp.delete(this.basePath + role_id);
  }
}

