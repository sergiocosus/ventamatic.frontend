import { Component, OnInit } from '@angular/core';
import {ReportService} from "../../../shared/report/report.service";
import {NotifyService} from "../../../services/notify.service";
import {messages} from "../../../shared/messages";
import {IMyDateRangeModel} from "mydaterangepicker";

@Component({
  selector: 'app-schedule-report',
  templateUrl: './schedule-report.component.html',
  styleUrls: ['./schedule-report.component.scss']
})
export class ScheduleReportComponent implements OnInit {
  private schedules = [];

  request:{
    id:number,
    branch_id:number,
    user_id:number,
    begin_at:string,
    end_at:string
  };

  rangeOptions = {
    editableDateRangeField: true
  };

  constructor(private reportService:ReportService,
              private notify:NotifyService) { }

  ngOnInit() {
    this.resetRequest();
  }

  resetRequest(){
    this.request = {
      id:null,
      branch_id:null,
      user_id:null,
      begin_at:null,
      end_at:null,
    };
  }

  onDateRangeChanged($event: IMyDateRangeModel) {
    this.reportService.formatRange(this.request, $event);
  }

  submit(){
    console.log(this.request);
    //this.request.begin_at = (<any>this.request.range).beginJsDate;
    this.reportService.getSchedule(this.request).subscribe(
      schedules => {
        this.schedules = schedules;
        if (!this.schedules.length) {
          this.notify.alert(messages.report.voidBody, messages.report.voidTitle)
        }
      },
      error => this.notify.serviceError(error)
    );
  }

  downloadCSV(){
    this.reportService.downloadCSV(this.schedules.map(
      schedule => ({
        id: schedule.id,
        sucursal_id: schedule.branch_id,
        usuario_id: schedule.user_id,
        monto_inicial: schedule.initial_amount,
        monto_del_sistema: schedule.system_amount,
        monto_final: schedule.final_amount,
        creado: this.reportService.formatDateTime(schedule.created_at),
        terminado: this.reportService.formatDateTime(schedule.updated_at)
      })
    ), `turnos-${new Date().toISOString()}`);
  }
}