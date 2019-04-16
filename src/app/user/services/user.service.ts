
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ApiHttp} from '../../shared/services/api-http';
import {User} from '../classes/user';
import {Role} from '../../rol/classes/role';


@Injectable()
export class UserService {
  private basePath = 'user/';

  constructor(private apiHttp: ApiHttp) {}

  getAll(params?: any) {
    return this.apiHttp.get(this.basePath, params).pipe(
        map(res => User.parseArray(res.users)));
  }

  get(userId: number) {
    return this.apiHttp.get(this.basePath + userId).pipe(
      map(res => new User().parse(res.user)));
  }

  getMe() {
    return this.apiHttp.get(this.basePath + 'me').pipe(
      map(res => new User().parse(res.user)));
  }

  getSearch(search: string) {
    return this.apiHttp.get(this.basePath + 'search', {search: search}).pipe(
      map(res => User.parseArray(res.users)));
  }

  post(user: User) {
    return this.apiHttp.post(this.basePath, user).pipe(
      map(res => new User().parse(res.user)));
  }

  delete(userId: number) {
    return this.apiHttp.delete(this.basePath + userId);
  }

  restore(user_id: number) {
    return this.apiHttp.patch(this.basePath + user_id + '/restore', {}).pipe(
      map(data => new User().parse(data.user)));
  }

  put(user: User) {
    return this.apiHttp.put(this.basePath + user.id, user).pipe(
      map(res => new User().parse(res.user)));
  }

  putPassword(current_password, password) {
    return this.apiHttp.put(this.basePath + 'me/password', {
        current_password: current_password,
        password: password
      });
  }

  putRoles(user: User, roles: number[]) {
    return this.apiHttp.put(this.basePath + user.id + '/roles', {roles: roles}).pipe(
      map(res => {return Role.parseArray(res.roles); }));
  }

  putBranchRoles(user: User, branch_roles: any[]) {
    return this.apiHttp.put(this.basePath + user.id + '/branch-roles', {branch_roles: branch_roles}).pipe(
      map(res => {return Role.parseArray(res.branch_roles); }));
  }
}
