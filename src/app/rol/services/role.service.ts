import { Injectable } from '@angular/core';
import {ApiHttp} from '../../shared/services/api-http';
import {Role} from '../classes/role';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RoleService {
  private basePath = 'security/system/role/';

  private rolesSubject: ReplaySubject<Role[]> = new ReplaySubject(1);
  private rolesRequest: Observable<Role[]>;

  constructor(private apiHttp: ApiHttp) {}

  getAll() {
    return this.apiHttp.get(this.basePath)
      .map(json => Role.parseArray(json.roles));
  }

  getAllCached(refresh = false) {
    if (refresh || !this.rolesRequest) {
      this.rolesRequest = this.getAll();

      this.rolesRequest.subscribe(
        result => this.rolesSubject.next(result),
        err => this.rolesSubject.error(err)
      );
    }

    return this.rolesSubject.asObservable();
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

