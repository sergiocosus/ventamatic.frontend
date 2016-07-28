import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {ModalComponent, MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {FloatingLabelComponent} from "../../../components/floating-label/floating-label.component";
import {ScheduleService} from "../schedule.service";
import {Schedule} from "../schedule";
import {InputLabelComponent} from "../../../components/input-label/input-label.component";

@Component({
  moduleId: module.id,
  selector: 'end-schedule-modal',
  templateUrl: 'end-schedule-modal.component.html',
  styleUrls: ['end-schedule-modal.component.css'],
  directives: [
    MODAL_DIRECTIVES,
    FloatingLabelComponent,
    InputLabelComponent
  ]
})
export class EndScheduleModalComponent implements OnInit {
  @ViewChild(ModalComponent) protected modal:ModalComponent;

  final_amount:number = 0;
  finished_schedule:Schedule = null;;

  constructor(private scheduleService:ScheduleService) {}

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
        console.log(schedule);
        this.finished_schedule = schedule;
        this.scheduleService.updateCurrentSchedule(null);
      }
    )
  }

}
