import {Injectable} from '@angular/core';
import {ApiHttp} from "../shared/api-http";
import {User} from "./user";

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

  delete(userId:number){
    return this.apiHttp.delete(this.basePath + userId);
  }

  put(user:User){
    return this.apiHttp.put(this.basePath + user.id, user)
        .map(res => {return <User>res.user});
  }
}
