import { Component, OnInit } from '@angular/core';

import {MatDialogRef} from '@angular/material';
import {Schedule} from '../../../api/models/schedule';
import {ScheduleService} from '../../../api/services/schedule.service';
import {NotifyService} from '../../../../shared/services/notify.service';

@Component({
  selector: 'app-end-schedule-dialog',
  templateUrl: './end-schedule-dialog.component.html',
  styleUrls: ['./end-schedule-dialog.component.scss'],
})
export class EndScheduleDialogComponent implements OnInit {
  final_amount = 0;
  finished_schedule: Schedule = null;
  schedule: Schedule;

  constructor(private scheduleService: ScheduleService,
              private notify: NotifyService,
              private dialogRef: MatDialogRef<EndScheduleDialogComponent>) {}

  ngOnInit() {
  }

  init(schedule: Schedule) {
    this.schedule = schedule;
  }

  close() {
    this.dialogRef.close();
  }

  clear() {
    this.finished_schedule = null;
    this.final_amount = 0;
  }

  submit() {
    this.scheduleService.finish(this.final_amount).subscribe(
      schedule => {
        this.finished_schedule = schedule;
        this.scheduleService.updateCurrentSchedule(null);
      },
      error => this.notify.serviceError(error)
    );
  }

  submitNote() {
    this.scheduleService.putNote(this.finished_schedule.id, this.finished_schedule.note)
      .subscribe(
        schedule => this.notify.success('Nota guardada'),
        error => this.notify.serviceError(error)
      );
  }

}
