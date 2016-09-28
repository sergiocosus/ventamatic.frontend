import {Injectable} from '@angular/core';
import {ApiHttp} from "../shared/api-http";
import {User} from "./user";
import {Role} from "../+app/+roles/classes/role";

@Injectable()
export class UserService {
  private basePath = 'user/';

  constructor(private apiHttp:ApiHttp) {}

  getAll() {
    return this.apiHttp.get(this.basePath)
        .map(res => {return <User[]>res.users});
  }

  get(userId:number) {
    return this.apiHttp.get(this.basePath + userId)
      .map(res => {return <User>res.user});
  }

  post(user:User){
    return this.apiHttp.post(this.basePath, user)
      .map(res => {return <User>res.user});
  }

  delete(userId:number){
    return this.apiHttp.delete(this.basePath + userId);
  }

  put(user:User){
    return this.apiHttp.put(this.basePath + user.id, user)
        .map(res => {return <User>res.user});
  }

  putRoles(user:User, roles:number[]){
    return this.apiHttp.put(this.basePath + user.id +'/roles', {roles:roles})
      .map(res => {return Role.parseArray(res.roles)});
  }

  putBranchRoles(user:User, branch_roles:any[]){
    return this.apiHttp.put(this.basePath + user.id +'/branch-roles', {branch_roles:branch_roles})
      .map(res => {return Role.parseArray(res.branch_roles)});
  }
}
