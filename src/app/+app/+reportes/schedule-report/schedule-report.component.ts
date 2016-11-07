import { Component, OnInit } from '@angular/core';
import {ReportService} from "../../../shared/report/report.service";
import {NotifyService} from "../../../services/notify.service";

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
      end_at:null
    };
  }

  submit(){
    this.reportService.getSchedule(this.request).subscribe(
      buys => this.schedules = buys,
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
        creado: this.reportService.formatDate(schedule.created_at),
        terminado: this.reportService.formatDate(schedule.updated_at)
      })
    ), `turnos-${new Date().toISOString()}`);
  }
}
