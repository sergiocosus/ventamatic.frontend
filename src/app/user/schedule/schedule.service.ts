import { Injectable } from '@angular/core';
import {ApiHttp} from "../../shared/api-http";
import {Observable} from "rxjs/Observable";
import {Schedule} from "./schedule";

@Injectable()
export class ScheduleService {

  private basePath = 'user/me/schedule/';

  constructor(private apiHttp:ApiHttp) {}


  getCurrent():Observable<Schedule> {
    return this.apiHttp.get(this.basePath + 'current')
      .map( res => {return res.users});
  }

  post(schedule:Schedule) {
    return this.apiHttp.post(this.basePath , schedule)
      .map(res => {return res.user});
  }

  patch(schedule_id:number){
    return this.apiHttp.delete(this.basePath + schedule_id);
  }

}
