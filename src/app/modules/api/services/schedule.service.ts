import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Schedule } from '../models/schedule';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private basePath = 'user/me/schedule/';

  private currentScheduleReplaySubject: ReplaySubject<Schedule>;
  private currentShedule: Schedule = null;

  constructor(private apiHttp: HttpClient) {
    this.currentScheduleReplaySubject = new ReplaySubject<Schedule>(1);
  }

  getCurrent(): Observable<Schedule> {
    return this.apiHttp.get(this.basePath + 'current')
      .pipe(this.mapSchedule());
  }

  post(branch_id, initial_amount) {
    return this.apiHttp.post(this.basePath + branch_id, {initial_amount: initial_amount})
      .pipe(this.mapSchedule());
  }

  putNote(schedule_id, note) {
    return this.apiHttp.put(this.basePath + 'note/' + schedule_id, {note: note})
      .pipe(this.mapSchedule());
  }

  finish(data: {final_amount: number}) {
    return this.apiHttp.put(this.basePath, data)
      .pipe(this.mapSchedule());
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


  private mapSchedule() {
    return map(response => new Schedule().parse(response['schedule']));
  }

  private mapSchedules() {
    return map(response => Schedule.parseArray(response['schedules']));
  }
}
