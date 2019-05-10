import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Schedule } from '@app/api/models/schedule';
import { ScheduleService } from '@app/api/services/schedule.service';
import { NotifyService } from '@app/shared/services/notify.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinishedScheduleDialogComponent } from '@app/user/components/finished-schedule-dialog/finished-schedule-dialog.component';

@Component({
  selector: 'app-end-schedule-dialog',
  templateUrl: './end-schedule-dialog.component.html',
  styleUrls: ['./end-schedule-dialog.component.scss'],
})
export class EndScheduleDialogComponent implements OnInit {
  form: FormGroup;
  finished_schedule: Schedule = null;

  constructor(private scheduleService: ScheduleService,
              private notify: NotifyService,
              private dialogRef: MatDialogRef<EndScheduleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public schedule: Schedule,
              private fb: FormBuilder,
              private dialog: MatDialog) {
    this.form = this.fb.group({
      final_amount: [0, [Validators.required]]
    });
  }

  ngOnInit() {
  }

  clear() {
    this.form.reset({final_amount: 0});
    this.finished_schedule = null;
  }

  submit() {
    if (this.form.invalid) {
      this.notify.error('Hay errores o faltan datos');
      return;
    }

    this.scheduleService.finish(this.form.getRawValue()).subscribe(
      schedule => {
        this.finished_schedule = schedule;
        this.scheduleService.updateCurrentSchedule(null);
        this.dialogRef.close();
        this.dialog.open(FinishedScheduleDialogComponent, {data: schedule});
      },
      error => this.notify.serviceError(error)
    );
  }


}
