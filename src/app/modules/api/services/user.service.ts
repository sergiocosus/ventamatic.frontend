import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Role } from '../models/role';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private basePath = 'user/';

  constructor(private httpClient: HttpClient) {
  }

  getAll(params?: any) {
    return this.httpClient.get(this.basePath, params)
      .pipe(this.mapUsers());
  }

  get(userId: number) {
    return this.httpClient.get(this.basePath + userId)
      .pipe(this.mapUser());
  }

  getMe() {
    return this.httpClient.get(this.basePath + 'me')
      .pipe(this.mapUser());
  }

  getSearch(search: string) {
    return this.httpClient.get(this.basePath + 'search', {params: {search}})
      .pipe(this.mapUsers());
  }

  post(user: User) {
    return this.httpClient.post(this.basePath, user)
      .pipe(this.mapUser());
  }

  delete(userId: number) {
    return this.httpClient.delete(this.basePath + userId);
  }

  restore(user_id: number) {
    return this.httpClient.patch(this.basePath + user_id + '/restore', {})
      .pipe(this.mapUser());
  }

  put(user: User) {
    return this.httpClient.put(this.basePath + user.id, user)
      .pipe(this.mapUser());
  }

  putPassword(current_password, password) {
    return this.httpClient.put(this.basePath + 'me/password', {
      current_password: current_password,
      password: password
    });
  }

  putRoles(user: User, roles: number[]) {
    return this.httpClient.put(this.basePath + user.id + '/roles', {roles: roles})
      .pipe(this.mapRole());
  }

  putBranchRoles(user: User, branch_roles: any[]) {
    return this.httpClient.put(this.basePath + user.id + '/branch-roles', {branch_roles: branch_roles})
      .pipe(map(response => Role.parseArray(response['branch_roles'])));
  }

  mapRole() {
    return map(response => Role.parseArray(response['roles']));
  }

  private mapUser() {
    return map(response => new User().parse(response['user']));
  }

  private mapUsers() {
    return map(response => User.parseArray(response['users']));
  }
}
