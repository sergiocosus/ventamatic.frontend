import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Role } from '../models/role';
import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private basePath = 'security/system/role/';

  private rolesSubject: ReplaySubject<Role[]> = new ReplaySubject(1);
  private rolesRequest: Observable<Role[]>;

  constructor(private apiHttp: HttpClient) {
  }

  getAll() {
    return this.apiHttp.get(this.basePath).pipe(this.mapRoles());
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

  clearCache() {
    this.rolesRequest = null;
  }

  get(role_id) {
    return this.apiHttp.get(this.basePath + role_id).pipe(this.mapRole());
  }

  post(role: Role) {
    return this.apiHttp.post(this.basePath, role).pipe(this.mapRole());
  }

  put(role: Role) {
    return this.apiHttp.put(this.basePath + role.id, role).pipe(this.mapRole());
  }

  delete(role_id: number) {
    return this.apiHttp.delete(this.basePath + role_id);
  }

  protected mapRole() {
    return map(response => new Role().parse(response['role']));
  }

  protected mapRoles() {
    return map(response => Role.parseArray(response['roles']));
  }
}

