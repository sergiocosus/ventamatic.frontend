import { Component, Inject, OnInit } from '@angular/core';
import { ScheduleService } from '@app/api/services/schedule.service';
import { NotifyService } from '@app/shared/services/notify.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Schedule } from '@app/api/models/schedule';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-finished-schedule-dialog',
  templateUrl: './finished-schedule-dialog.component.html',
  styleUrls: ['./finished-schedule-dialog.component.scss']
})
export class FinishedScheduleDialogComponent implements OnInit {
  form: FormGroup;

  constructor(private scheduleService: ScheduleService,
              private notify: NotifyService,
              private dialogRef: MatDialogRef<FinishedScheduleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public schedule: Schedule,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      note: [null, [Validators.required]]
    });
  }

  ngOnInit() {
  }

  submit() {
    if (this.form.invalid) {
      this.notify.error('Hay errores o faltan datos');
      return;
    }

    this.scheduleService.putNote(this.schedule.id, this.form.getRawValue().note)
      .subscribe(
        schedule => this.notify.success('Nota guardada'),
        error => this.notify.serviceError(error)
      );
  }
}
