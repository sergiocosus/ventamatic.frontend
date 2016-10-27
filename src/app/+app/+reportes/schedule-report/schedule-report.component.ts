import { Component, OnInit } from '@angular/core';
import {ReportService} from "../../../shared/report/report.service";

@Component({
  selector: 'app-schedule-report',
  templateUrl: './schedule-report.component.html',
  styleUrls: ['./schedule-report.component.scss']
})
export class ScheduleReportComponent implements OnInit {
  private schedules;

  request:{
    id:number,
    branch_id:number,
    user_id:number,
    begin_at:string,
    end_at:string
  };

  constructor(private reportService:ReportService) { }

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
      buys => this.schedules = buys
    )
  }
}
