import {Injectable} from '@angular/core';
import {ApiHttp} from "../shared/api-http";
import {User} from "./user";
import {Role} from "../app/+roles/classes/role";

@Injectable()
export class UserService {
  private basePath = 'user/';

  constructor(private apiHttp:ApiHttp) {}

  getAll(params?: any) {
    return this.apiHttp.get(this.basePath, params)
        .map(res => User.parseArray(res.users));
  }

  get(userId:number) {
    return this.apiHttp.get(this.basePath + userId)
      .map(res => new User().parse(res.user));
  }

  getMe() {
    return this.apiHttp.get(this.basePath + 'me')
      .map(res => new User().parse(res.user));
  }

  getSearch(search:string) {
    return this.apiHttp.get(this.basePath + 'search', {search: search})
      .map(res => User.parseArray(res.users));
  }

  post(user:User){
    return this.apiHttp.post(this.basePath, user)
      .map(res => new User().parse(res.user));
  }

  delete(userId:number){
    return this.apiHttp.delete(this.basePath + userId);
  }

  restore(user_id: number) {
    return this.apiHttp.patch(this.basePath + user_id + '/restore', {})
      .map(data => new User().parse(data.user));
  }

  put(user:User){
    return this.apiHttp.put(this.basePath + user.id, user)
      .map(res => new User().parse(res.user));
  }

  putRoles(user:User, roles:number[]){
    return this.apiHttp.put(this.basePath + user.id +'/roles', {roles:roles})
      .map(res => {return Role.parseArray(res.roles)});
  }

  putBranchRoles(user:User, branch_roles:any[]){
    return this.apiHttp.put(this.basePath + user.id +'/inventory-roles', {branch_roles:branch_roles})
      .map(res => {return Role.parseArray(res.branch_roles)});
  }
}
