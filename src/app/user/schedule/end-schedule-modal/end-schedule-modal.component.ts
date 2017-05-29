import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {ModalComponent} from "ng2-bs4-modal/ng2-bs4-modal";
import {ScheduleService} from "../schedule.service";
import {Schedule} from "../schedule";
import {NotifyService} from '../../../services/notify.service';

@Component({
  selector: 'end-schedule-modal',
  templateUrl: 'end-schedule-modal.component.html',
  styleUrls: ['end-schedule-modal.component.scss'],
})
export class EndScheduleModalComponent implements OnInit {
  @ViewChild(ModalComponent) protected modal:ModalComponent;

  final_amount: number = 0;
  finished_schedule: Schedule = null;

  constructor(private scheduleService:ScheduleService,
              private notify: NotifyService) {}

  ngOnInit() {
  }

  open(){
    this.modal.open();
  }

  close(){
    this.modal.close();
  }

  clear(){
    this.finished_schedule = null;
    this.final_amount = 0;
  }

  submit(){
    this.scheduleService.finish(this.final_amount).subscribe(
      schedule => {
        this.finished_schedule = schedule;
        this.scheduleService.updateCurrentSchedule(null);
      },
      error => this.notify.serviceError(error)
    )
  }

  submitNote() {
    this.scheduleService.putNote(this.finished_schedule.id, this.finished_schedule.note)
      .subscribe(
        schedule => this.notify.success('Nota guardada'),
        error => this.notify.serviceError(error)
      );
  }

}
