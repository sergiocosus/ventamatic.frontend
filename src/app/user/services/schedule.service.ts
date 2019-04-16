
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {ReplaySubject, Observable} from 'rxjs';
import {Schedule} from '../classes/schedule';
import {ApiHttp} from '../../shared/services/api-http';

@Injectable()
export class ScheduleService {
  private basePath = 'user/me/schedule/';

  private currentScheduleReplaySubject: ReplaySubject<Schedule>;
  private currentShedule: Schedule = null;

  constructor(private apiHttp: ApiHttp) {
    this.currentScheduleReplaySubject = new ReplaySubject<Schedule>(1);
  }

  getCurrent(): Observable<Schedule> {
    return this.apiHttp.get(this.basePath + 'current').pipe(
      map( json => {return new Schedule().parse(json.schedule); }));
  }

  post(branch_id, initial_amount) {
    return this.apiHttp.post(this.basePath + branch_id , {initial_amount: initial_amount}).pipe(
      map(json => new Schedule().parse(json.schedule)));
  }

  putNote(schedule_id, note) {
    return this.apiHttp.put(this.basePath + 'note/' + schedule_id, {note: note}).pipe(
      map(json => new Schedule().parse(json.schedule)));
  }

  finish(final_amount: number) {
    return this.apiHttp.put(this.basePath, {final_amount: final_amount}).pipe(
      map(json => new Schedule().parse(json.schedule)));
  }

  getCurrentSchedule() {
    return this.currentScheduleReplaySubject;
  }

  updateCurrentSchedule(schedule?: Schedule) {
    if (schedule) {
      this.currentShedule = schedule;
      this.currentScheduleReplaySubject.next(this.currentShedule);
    } else {
      this.getCurrent()
        .subscribe(currentSchedule => {
            this.currentShedule = currentSchedule;
            this.currentScheduleReplaySubject.next(this.currentShedule);
          },
          error => {
            this.currentShedule = null;
            this.currentScheduleReplaySubject.next(this.currentShedule);
          });
    }
  }

}
